const User = require("../models/user");
const Post = require("../models/Post");
const { body, validationResult } = require("express-validator");

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ validationErrors: errors.array() });
  }

  try {
    const postData = {};
    postData.userId = req.userId;
    console.log(postData.userId);
    if (req.body.title) postData.title = req.body.title;
    if (req.body.content) postData.content = req.body.content;

    const user = await User.findById(req.userId).select("-password");
    postData.avatar = user.avatar;
    postData.writer = user.name;

    const newPost = await new Post(postData).save();
    return res
      .status(200)
      .json({ message: "Post added susccefuly", post: newPost });
  } catch (err) {
    return res.status(500).json({ message: "Can't add post", error: err });
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const fetchedPosts = await Post.find().sort({ date: -1 });

    res.status(200).json({
      msg: "Posts fetched susccefuly ",
      posts: fetchedPosts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error : get all posts");
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const fetchedPost = await Post.findById(req.params.post_id);
    if (!fetchedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({
      msg: "Post fetched susccefuly ",
      posts: fetchedPost,
    });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(500).send("server error : get all posts");
  }
};

exports.deletePostById = (req, res, next) => {
  //check authorization
  Post.findById(req.params.post_id).then((fetchedPost) => {
    if (fetchedPost.userId != req.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }
  });

  //delete the post by id
  Post.findOneAndDelete(req.params.post_id)
    .then((postResult) => {
      if (!postResult)
        return res.status(400).json({
          message: "Post not found",
        });

      res.status(200).json({ message: "Post deleted susccefuly " });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Server error: can't delete post", error: err });
    });
};

exports.like = (req, res, next) => {
  Post.findById(req.params.post_id)
    .then((fetchedPost) => {
      if (!fetchedPost)
        return res.status(400).json({ message: "Post not found" });
      if (
        fetchedPost.likes.filter((like) => like.user.toString() === req.userId)
          .length > 0
      )
        return res.status(400).json({
          message: "User has liked this post before",
          likes: fetchedPost.likes,
        });

      fetchedPost.likes.unshift({ user: req.userId });
      console.log(fetchedPost.likes);
      fetchedPost.save();

      res
        .status(200)
        .json({ message: "user now like the post", likes: fetchedPost.likes });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Server error: can't like post", error: err });
    });
};

exports.unlike = (req, res, next) => {
  Post.findById(req.params.post_id)
    .then((fetchedPost) => {
      if (!fetchedPost)
        return res.status(400).json({ message: "Post not found" });
      if (
        fetchedPost.likes.filter((like) => like.user.toString() === req.userId)
          .length === 0
      )
        return res.status(400).json({
          message: "User has not liked this post before",
          likes: fetchedPost.likes,
        });

      //Get index
      const index = fetchedPost.likes
        .map((like) => like.user.toString())
        .indexOf(req.userId);
      fetchedPost.likes.splice(index, 1);
      console.log(fetchedPost.likes);
      fetchedPost.save();

      res
        .status(200)
        .json({ message: "like removed", likes: fetchedPost.likes });
    })
    .catch((err) => {
      if (err.kind === "ObjectId")
        return res.status(400).json({ message: "Post not found" });
      return res
        .status(500)
        .json({ message: "Server error: can't unlike post", error: err });
    });
};

exports.addComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ validationErrors: errors.array() });
  }

  try {
    //Creating the comment data
    const commentData = {};
    commentData.user = req.userId;
    if (req.body.text) commentData.text = req.body.text;
    const user = await User.findById(req.userId).select("-password");
    commentData.avatar = user.avatar;

    //Post exists
    const selectedPost = await Post.findById(req.params.post_id);
    if (!selectedPost)
      return res.status(400).json({ message: "Post not found" });

    //updating the post
    selectedPost.comments.unshift(commentData);
    const postUpdated = await selectedPost.save();
    return res.status(200).json({
      message: "comment added susccefuly to the post" + req.params.post_id,
      comments: postUpdated.comments,
    });
  } catch (err) {
    return res.status(500).json({ message: "Can't add comment", error: err });
  }
};

exports.deleteComment = (req, res, next) => {
  //Check post
  Post.findById(req.params.post_id)
    .then((fetchedPost) => {
      if (!fetchedPost)
        return res.status(400).json({
          message: "Post not found",
        });

      //Check comment
      if (
        fetchedPost.comments
          .map((comment) => comment.id.toString())
          .indexOf(req.params.comment_id) === -1
      )
        return res.status(400).json({ message: "Comment not found" });

      //Check user
      if (
        fetchedPost.comments
          .map((comment) => comment.user.toString())
          .indexOf(req.userId) === -1
      )
        return res
          .status(400)
          .json({ message: "User not authorized to delete the comment" });

      // Get index
      const index = fetchedPost.comments
        .map((comment) => comment.id.toString())
        .indexOf(req.params.comment_id);

      fetchedPost.comments.splice(index, 1);
      console.log(fetchedPost.comments);
      fetchedPost.save();
      res.status(200).json({
        message: "Comment deleted susccefuly from post" + req.params.post_id,
        comments: fetchedPost.comments,
      });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Server error: can't delete comment", error: err });
    });
};
