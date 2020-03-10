const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
const register = (req, res, next) => {
  // Encrypt the submitted password
  bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
    if (err) {
      res.json({
        error: err
      });
    }

    // Register new user with hashedPass
    let user = new User({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPass
    });

    user
      .save()
      .then(user => {
        res.json({
          message: "User created successfully"
        });
      })
      .catch(err => {
        res.json({
          message: "An Error Occured"
        });
      });
  });
};

// Login user
const login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ $or: [{ email: username }, { phone: username }] }).then(
    user => {
      if (user) {
        bcrypt.compare(password, user.password, function(err, result) {
          if (err) {
            res.json({
              error: err
            });
          }

          if (result) {
            let token = jwt.sign({ name: user.name }, "verySecretKey", {
              expiresIn: "1h"
            });
            res.json({
              message: "Login Successfully!",
              token
            });
          } else {
            res.json({
              message: "Password does not matched!"
            });
          }
        });
      } else {
        res.json({
          message: "No user found!"
        });
      }
    }
  );
};

module.exports = { register, login };
