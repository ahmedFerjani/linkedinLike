const express = require("express");
const router = express.Router();

// @route       GET api/auth
// @desc        auth route
// @access      Public
router.get("/", (req, res, next) => {
  res.send("auth works / ");
});

module.exports = router;
