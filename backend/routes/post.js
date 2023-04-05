const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
// const { ObjectId }= require('mongodb')
const Post = require("../models/Post");
const UserComment = require("../models/Comment");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const requireLogin = require("../middlewares/requireLogin");

router.post("/createpost", requireLogin, async (req, res) => {
  const { title, body, description,image } = req.body;
  if (!title || !body || !description || !image) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  const post = new Post({
    title,
    body,
    description,
    image,
    postedBy: req._id,
  });
  post
    .save()
    .then((post) => {
      res.json({ message: "saved successfully", post });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/allposts", async (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.status(200).json({
        status: true,
        posts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/mypost/:id", async (req, res) => {
  const { id } = req.params;
  // const query = mongoose.Type.ObjectId(id);
  Post.find({ postedBy:id })
    .populate("postedBy", "_id name")
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  await Post.findById(id).populate("comments", "content")
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/delete/:id", requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(401).send("Incorrect ID");
    }
    const removePost = await Post.findOneAndDelete({ _id: id });
    return res.json({
      message: "successfully deleted the post!",
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.put("/edit/:id", requireLogin, async (req, res) => {
  const { id } = req.params;
  const { description, title, body, image } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(401).send("Incorrect ID");
    } else {
      const doc = await Post.findById(id);
      doc.description = description;
      doc.title = title;
      doc.body = body;
      doc.image = image;
      // doc.postedBy = req.user;
      await doc.save();
      return res.json({
        message: "successfully edited the post.",
      });
    }
  } catch (err) {
    return res.send(err);
  }
});

router.post("/comment/:id", requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    // console.log(content);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(401).send("Incorrect ID");
    }
    const currentPost = await Post.findOne({ _id: id });
    if (currentPost) {
      const addedComment = new UserComment({
        content: content,
      });
      const addComment = await addedComment.save();
      currentPost.comments.push(addComment._id);
      await currentPost.save();
      return res.status(201).json({
        comment_id: addComment._id,
      });
    }
    return res.status(401).send("Post does not exist");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
