const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const router = express.Router();

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

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
        departWorkBy: req.body.departWorkBy
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = { id: user.id, handle: user.handle };

              jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
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
            const payload = { id: user.id, handle: user.handle };

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            return res.status(400).json({ password: 'Incorrect password' });
          }
        })
    })
})


// You may want to start commenting in information about your routes so that you can find the appropriate ones quickly.
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email,
    homeAddress: req.user.homeAddress,
    workAddress: req.user.workAddress,
    arriveToWorkBy: req.user.arriveToWorkBy,
    departWorkBy: req.user.departWorkBy
  });
})

// router.put(
//   "/:id",
//   // passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     User.find(req.params.id),
//       {
//         handle: req.body.handle,
//         email: req.body.email,
//         password: req.body.password,
//         homeAddress: req.body.homeAddress,
//         workAddress: req.body.workAddress,
//         arriveToWorkBy: req.body.arriveToWorkBy,
//         departWorkBy: req.body.departWorkBy
//       },
//       function(err) {
//         if (err) {
//           return res.send(err);
//         }
//         console.log({ message: "movie updated" });
//       }
//     );
//   }
// );

router.route("/:id").post(function(req, res) {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password,
        homeAddress: req.body.homeAddress,
        workAddress: req.body.workAddress,
        arriveToWorkBy: req.body.arriveToWorkBy,
        departWorkBy: req.body.departWorkBy
      },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// router.put("/movies/:id", function(req, res) {
//   Movie.findOneAndUpdate(
//     req.params.id,
//     {
//       title: "the gift4",
//       releaseYear: "2012",
//       director: "stefan",
//       genre: "horror"
//     },
//     function(err) {
//       if (err) {
//         return res.send(err);
//       }
//       console.log({ message: "movie updated" });
//     }
//   );
// });
// router.patch("/:id", function(req, res, next) {
//   Comment.update(
//     { comment: req.body.comment },
//     { where: { id: req.params.id } }
//   )
//     .then(result => {
//       res.json(result);
//     })
//     .catch(err => {
//       console.error(err);
//       next(err);
//     });
// });

module.exports = router;