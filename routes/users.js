const express = require("express");
const router = express.Router();

// @route       GET api/users
// @desc        Users route
// @access      Public
router.get("/", (req, res, next) => {
  res.send("users route works / ");
});

module.exports = router;
