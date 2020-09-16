const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const Post = require("../../model/Post");
const User = require("../../model/User");

//@route POST api/posts
//@desc  Create a post
//@access Private

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      let user = await User.findById(req.user.id).select("-password");
      console.log(req.body);
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      let post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

//@route GET api/posts
//@desc  get all post
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    let posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//@route GET api/posts/:id
//@desc  get post by id
//@access Private
router.get("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not Found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Post Not Found" });
    }
    res.status(500).send("Server error");
  }
});

//@route GET api/posts/:id
//@desc  get post by id
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not Found" });
    } else {
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Permission Denied" });
      } else {
        await post.remove();
        res.json({ msg: "Post removed" });
      }
    }
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Post Not Found" });
    }
    res.status(500).send("Server error");
  }
});

//@route put api/posts/like/:id
//@desc  like post
//@access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not Found" });
    } else {
      //post liked or not

      if (
        post.likes.filter((like) => String(like.user) === req.user.id).length >
        0
      ) {
        return res.status(400).json({ msg: "Post already liked" });
      } else {
        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
      }
    }
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Post Not Found" });
    }
    res.status(500).send("Server error");
  }
});

//@route put api/posts/unlike/:id
//@desc  unlike post
//@access Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not Found" });
    } else {
      //post liked or not
      if (
        post.likes.filter((like) => String(like.user) === req.user.id)
          .length === 0
      ) {
        return res.status(400).json({ msg: "Post has  not liked by you" });
      } else {
        let rmIndex = post.likes
          .map((like) => like.user.toString())
          .indexOf(req.user.id);
        post.likes.splice(rmIndex, 1);

        await post.save();

        res.json(post.likes);
      }
    }
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Post Not Found" });
    }
    res.status(500).send("Server error");
  }
});

//@route POST api/posts/comments/:id
//@desc  Create a comments
//@access Private

router.post(
  "/comments/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      let user = await User.findById(req.user.id).select("-password");
      let post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

//@route DELETE api/posts/comments/:id/:comment_id
//@desc  Delete a comments
//@access Private
router.delete("/comments/:id/:comment_id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    //Pull the comment
    let comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment not Found" });
    }
    //Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Permission Denied" });
    }

    let rmIndex = post.comments
      .map((comment) => comment.id.toString())
      .indexOf(comment.id);
    post.comments.splice(rmIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
