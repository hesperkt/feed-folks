const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    message: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now, 
    },
    delete: {
      type: Boolean,
      required: true,
      default: false,
    },
  });
  
  module.exports = mongoose.model("Message", MessageSchema);