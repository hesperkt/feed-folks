const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now, //date with current time
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  delete: {
    type: Boolean,
    required: true,
    default: false,
  }
});

module.exports = mongoose.model("Comment", CommentSchema);