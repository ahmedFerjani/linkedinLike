const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.createUser = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ validationErrors: errors.array() });
  }

  //user exists or not
  User.findOne({ email: req.body.email }).then((findUser) => {
    if (findUser) {
      return res.status(400).json({ message: "user already exists" });
    } else {
      //create user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        //create avatar using email
        avatar: gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" }),
        password: req.body.password,
      });

      //encrypt password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          payload = {
            id: newUser.id,
          };
          newUser.save().then(
            (user) => {
              //creating token expires in 1 hour
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
            },
            //clb for an error inside then
            (err) => {
              res.status(400).json({ message: "cant create user", error: err });
            }
          );
        });
      });
    }
  });
};
