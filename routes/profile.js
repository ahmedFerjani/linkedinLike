const express = require("express");
const router = express.Router();

// @route       GET api/profile
// @desc        Profile route
// @access      Public
router.get("/", (req, res, next) => {
  res.send("profile works ");
});

module.exports = router;
