const cloudinary = require("../middleware/cloudinary")
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const { Image } = require('image-js');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }) // find document that has user property of logged in user and only get posts from the logged in user to display
      res.render("profile.ejs", { posts: posts, user: req.user }) 
    } catch (err) {
      console.log(err)
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean()//Post is our modelschema; find all of our posts -> sort them by time created at by descending order -> pass it (array of posts) to ejs and keep their name as posts
      res.render("feed.ejs", { posts: posts }) //talks to view folder with feed.ejs and sends the content back to the browswer
    } catch (err) {
      console.log(err)
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id) //go to Post and find post that meets query parameter (with specific ID; can change name of this item if POST routes is changed too) and send to ejs; is findByID a global method or did we create it?
      const comments = await Comment.find({postID:req.params.id, delete:false})
      console.log(post, comments)
      res.render("post.ejs", { post: post, user: req.user, comments: comments }) //lets us see post; user: req.user -> logged in user
    } catch (err) {
      console.log(err)
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!")
      res.redirect("/profile")
    } catch (err) {
      console.log(err)
    }
  },
  translatePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      Image.load(post).then(function(post){
        var grey = post.grey()
        grey.save(post)
      })
      console.log("Post has been translated!")
      res.redirect("/profile")
    } catch (err) {
      console.log(err)
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate( //find post with id from URL and update with additional like
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};

//Created on 5/7/2025 with Blu & Layoyo <3
  // createComment: async (req, res) => {
  //   try {
  //     await Comment.create({
  //       text: req.body.comment,
  //       likes: 0,
  //       postedBy: req.user.id,
  //       postID: req.params.id
  //     });
  //     console.log("Post has been added!");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }