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
              const payload = { id: user.id, handle: user.handle };
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                    user: {
                      id: user._id,
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
              id: user._id,
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

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      handle: req.user.handle,
      email: req.user.email,
      homeAddress: req.user.homeAddress,
      workAddress: req.user.workAddress,
      arriveToWorkBy: req.user.arriveToWorkBy,
      departWorkBy: req.user.departWorkBy,
      coords: req.user.coords
    });
  }
);

router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { email } = req.user;
    User.findOne({ email }).then(doc => {
      const {
        handle,
        homeAddress,
        workAddress,
        coords,
        arriveToWorkBy,
        departWorkBy
      } = req.body;

      handle ?
        doc.handle = handle : null;
      homeAddress ?
        doc.homeAddress = homeAddress : null;
      workAddress ?
        doc.workAddress = workAddress : null;
      coords ?
        doc.coords = coords : null;
      arriveToWorkBy ? 
        doc.arriveToWorkBy = arriveToWorkBy : null;
      departWorkBy ?
        doc.departWorkBy = departWorkBy : null;
      doc
        .save()
        .then(result => {
          const user = {
            id: result._id,
            handle: result.handle,
            email: result.email,
            homeAddress: result.homeAddress,
            workAddress: result.workAddress,
            arriveToWorkBy: result.arriveToWorkBy,
            departWorkBy: result.departWorkBy,
            coords: result.coords
          };
          console.log(jwt.sign);
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {

              console.log(payload)
              res.json({
                ...payload,
                success: true,
                token: "Bearer " + token
              });
            }
          );
        })
        .catch(err => res.send(err));
    });
  }
);

router.get("/test", (req, res) => {
  res.json('hello');
});

module.exports = router;