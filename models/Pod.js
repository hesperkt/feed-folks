const mongoose = require("mongoose");

const PodSchema = new mongoose.Schema({
  podName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  podID: {
    type: String,
    required: true,
  }, 
  peaOfThePod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  leavePod: {
    type: Boolean,
    default: false,
  },
  deletepod: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("Pod", PodSchema);