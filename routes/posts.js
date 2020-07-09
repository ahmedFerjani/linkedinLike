const express = require("express");
const router = express.Router();

// @route       GET api/posts
// @desc        posts route
// @access      Public
router.get("/", (req, res, next) => {
  res.send("posts works ");
});

module.exports = router;