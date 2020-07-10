const express = require("express");
const router = express.Router();
const authCheck = require("../middlewares/authCheck");
const { body, validationResult } = require("express-validator");
const postsController = require("../controllers/posts");

// @route       POST api/posts
// @desc        Create new post
// @access      Private
router.post(
  "/",
  [
    authCheck,
    [
      body("title", "Title of the post is required").not().isEmpty(),
      body("content", "Content of the post is required").not().isEmpty(),
    ],
  ],
  postsController.createPost
);

// @route       GET api/posts
// @desc        get all posts
// @access      Private
router.get("/", authCheck, postsController.getAllPosts);

// @route       GET api/posts/:post_id
// @desc        get post by id
// @access      Private
router.get("/:post_id", authCheck, postsController.getPostById);

// @route       DELETE api/posts/:post_id
// @desc        delete a post
// @access      Private
router.delete("/:post_id", authCheck, postsController.deletePostById);

// @route       PUT api/posts/like/:post_id
// @desc        Like a post
// @access      Private
router.put("/like/:post_id", authCheck, postsController.like);

// @route       PUT api/posts/unlike/:post_id
// @desc        Unlike a post
// @access      Private
router.put("/unlike/:post_id", authCheck, postsController.unlike);

// @route       PUT api/posts/comment/:post_id
// @desc        Add a comment to the post
// @access      Private
router.put(
  "/comment/:post_id",
  [
    authCheck,
    [body("text", "text of the comment is required").not().isEmpty()],
  ],
  postsController.addComment
);

// @route       DELETE api/posts/:post_id/comment/:comment_id
// @desc        delete a comment
// @access      Private
router.delete(
  "/:post_id/comment/:comment_id",
  authCheck,
  postsController.deleteComment
);

module.exports = router;
