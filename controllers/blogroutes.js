const router = require("express").Router();
const Category = require("../models/Category.js");
const Blog = require("../models/Blog.js");
const fetchuser = require("../middlewares/fetchuser.js");

//creating a post but we need to pass category id in params
//because we need to know that in which category we are creating a post
router.post("/create/:category_id", fetchuser, async (req, res) => {
  try {
    const { blog_title } = req.body;
    const id = req.id;
    const category_id = req.params.category_id;
    const blog = await Blog.create({
      blog_title: blog_title,
      user_id: id,
      category_id: category_id,
    });
    res.json({ success: true, blog: blog });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

//creating a get request for getting post of particular category

router.get("/getpost/:category_id", fetchuser, async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const blog = await Blog.find({ category_id: category_id });
    res.json({ success: true, blog: blog });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

//all post of all category
router.get("/getallpost", fetchuser, async (req, res) => {
  try {
    const blog = await Blog.find({});
    res.json({ success: true, blog: blog });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

//get all post of particular user
router.get("/getuserpost", fetchuser, async (req, res) => {
  try {
    const id = req.id;
    const blog = await Blog.find({ user_id: id });
    res.json({ success: true, blog: blog });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

//get all post of particular user of particular category
router.get("/getuserpost/:category_id", fetchuser, async (req, res) => {
  try {
    const id = req.id;
    const category_id = req.params.category_id;
    const blog = await Blog.find({ user_id: id, category_id: category_id });
    res.json({ success: true, blog: blog });
    1;
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});
//delete post
//but only logged in user can delete his post

router.delete("/deletepost/:post_id", fetchuser, async (req, res) => {
  try {
    const id = req.id;
    let blog = await Blog.findById(req.params.post_id);
    if (!blog) {
      return res.status(404).send("Not found");
    }
    if (blog.user_id.toString() !== id) {
      return res.status(401).send("Not allowed");
    }
    blog = await Blog.findByIdAndDelete(req.params.post_id);
    res.json({ success: true, blog: blog });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

//update post
//but only logged in user can update his post
//we have also check that the post is present or not
//also we have to check that the user is same or not
router.put("/updatepost/:post_id", fetchuser, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.post_id);
    const id = req.id;
    if (!blog) {
      res.json({ success: false, error: "Blog doesnt exist" });
    }
    const { blog_title } = req.body;
    if (blog.user_id.toString() !== id) {
      return res.status(401).send("Not allowed");
    }
    blog = await Blog.findByIdAndUpdate(
      req.params.post_id,
      { $set: { blog_title: blog_title } },
      { new: true }
    );
    res.json({ success: true, blog: blog });
  } catch (error) {
    res.send(500).body("Internal server error");
  }
});
module.exports = router;
