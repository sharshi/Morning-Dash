const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const keys = require('../../config/keys');
const User = require('../../models/User');

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      // Use the validations to send the error
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {

      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password,
        homeAddress: req.body.homeAddress,
        workAddress: req.body.workAddress,
        arriveToWorkBy: req.body.arriveToWorkBy,
        departWorkBy: req.body.departWorkBy,
        coords: req.body.coords
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = { _id: user._id, handle: user.handle };
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                    user: {
                      _id: user._id,
                      handle: user.handle,
                      email: user.email,
                      homeAddress: user.homeAddress,
                      workAddress: user.workAddress,
                      arriveToWorkBy: user.arriveToWorkBy,
                      departWorkBy: user.departWorkBy,
                      coords: user.coords 
                    }
                  });
                }
              );
            })
            .catch(err => console.log(err));
        });
      }); 
    }
  })
})

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              _id: user._id,
              handle: user.handle,
              email: user.email,
              homeAddress: user.homeAddress,
              workAddress: user.workAddress,
              arriveToWorkBy: user.arriveToWorkBy,
              departWorkBy: user.departWorkBy,
              coords: user.coords
            };

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res.status(400).json({ password: 'Incorrect password' });
          }
        })
    })
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    _id: req.user._id,
    handle: req.user.handle,
    email: req.user.email,
    homeAddress: req.user.homeAddress,
    workAddress: req.user.workAddress,
    arriveToWorkBy: req.user.arriveToWorkBy,
    departWorkBy: req.user.departWorkBy,
    coords: req.user.coords
  });
});

router.post("/edit", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { email } = req.body;
  User.findOne({ email })
  .then(doc => {
    doc.handle = req.body.handle;
    doc.homeAddress = req.body.homeAddress;
    doc.workAddress = req.body.workAddress;
    doc.coords = req.body.coords;
    doc.arriveToWorkBy = req.body.arriveToWorkBy;
    doc.departWorkBy = req.body.departWorkBy;
    doc
      .save()
      .then(result => res.json(result))
      .catch(err => res.send(err));
    });
  }
);

router.get("/test", (req, res) => {
  res.json('hello');
});

module.exports = router;