const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment.js");
const Blog = require("../models/Blog.js");
const fetchuser = require("../middlewares/fetchuser.js");

//creating the comment

router.post("/create/:blog_id", fetchuser, async (req, res) => {
  try {
    const { comment } = req.body;
    const id = req.id;
    const blog_id = req.params.blog_id;
    const comment_Created = await Comment.create({
      comment: comment,
      user_id: id,
      blog_id: blog_id,
    });
    res.json({ success: true, comment: comment_Created });
  } catch (error) {
    res.status(500).send("Internal server error");
  }

  //getting all the comment of particular blog
    router.get("/getcomment/:blog_id", fetchuser, async (req, res) => {
        try {
            let { page, size, sort } = req.query;
            if (!page) {
                page = 1;
            }
            if (!size) {
                size = 10;
            }
            const limit = parseInt(size);
            const blog_id = req.params.blog_id;
            const comment = await Comment.find({ blog_id: blog_id }).sort(  { votes: 1, _id: 1 }).limit(limit);
            res.json({ success: true, comment: comment });
        } catch (error) {
            res.status(500).send("Internal server error");
        }
    });
    //getting all the comment of particular user
    router.get("/getusercomment", fetchuser, async (req, res) => {
        try {
            const id = req.id;
            const comment = await Comment.find({ user_id: id });
            res.json({ success: true, comment: comment });
        } catch (error) {
            res.status(500).send("Internal server error");
        }
    });
    //find all the comments
    router.get("/getallcomment", fetchuser, async (req, res) => {
        try {
            const comment = await Comment.find({});
            res.json({ success: true, comment: comment });
        } catch (error) {
            res.status(500).send("Internal server error");
        }
    });
});
module.exports=router;