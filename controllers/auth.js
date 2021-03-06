const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

exports.getAuthUser = (req, res, next) => {
  User.findById(req.userId)
    .select("-password")
    .then((selectedUser) => {
      console.log(selectedUser);
      res.json(selectedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("internal server error");
    });
};

exports.authenticate = (req, res, next) => {
  // console.log(req.body);
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ validationErrors: errors.array() });
  }

  User.findOne({ email: req.body.email })
    .then((findUser) => {
      //Check email
      if (!findUser) {
        return res
          .status(400)
          .json({ message: "invalid credentials: wrong email" });
      } else {
        bcrypt.compare(req.body.password, findUser.password).then((isMatch) => {
          if (!isMatch) {
            return res
              .status(400)
              .json({ message: "invalid credentials: wrong password" });
          }
        });

        payload = {
          id: findUser.id,
        };

        jwt.sign(
          payload,
          config.get("jwtSecretKey"),
          {
            expiresIn: 60 * 60,
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
