const express = require("express");
const router = express.Router();
const authCheck = require("../middlewares/authCheck");
const { body, validationResult } = require("express-validator");
const authController = require("../controllers/auth");

// @route       GET api/auth
// @desc        auth route
// @access      Public
router.get("/", authCheck, authController.getAuthUser);

// @route       POST api/auth
// @desc        Authentication
// @access      Public
router.post(
  "/",
  [
    body("email", "please check the email format").isEmail(),
    body("password", "password is required").exists(),
  ],
  authController.authenticate
);

module.exports = router;
