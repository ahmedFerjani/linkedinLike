const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const usersController = require("../controllers/users");

// @route       GET api/users
// @desc        for test purpose
// @access      Public
router.get("/", (req, res, next) => {
  res.send("users route works / ");
});

// @route       POST api/users
// @desc        Create user
// @access      Public
router.post(
  "/",
  [
    body("email", "please check the email format").isEmail(),
    body("name", "name is required").not().isEmpty(),
    body("password", "password should have more than 5 characters").isLength({
      min: 5,
    }),
  ],
  usersController.createUser
);

module.exports = router;
