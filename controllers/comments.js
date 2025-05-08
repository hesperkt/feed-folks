const cloudinary = require("../middleware/cloudinary")
const Post = require("../models/Post")
const Comment = require("../models/Comment")

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        text: req.body.comment,
        likes: 0,
        postedBy: req.user.id,
        postID: req.params.postID
      });
      console.log("Comment has been added!")
      res.redirect("back") //special way to redirect to page but now page has been refreshed
    } catch (err) {
      console.log(err)
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate( //find comment with ID from URL and update with additional like
        { _id: req.params.commentID },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
        await Comment.findOneAndUpdate( //find comment with ID from URL and update with additional like
          { _id: req.params.commentID },
          {
            $set: { delete: true},
          }
        )
        console.log("Comment hidden");
        res.redirect("back");
      } catch (err) {
        console.log(err);
      }
  }
};
