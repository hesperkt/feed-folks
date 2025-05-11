const cloudinary = require("../middleware/cloudinary")
const mongoose = require("mongoose")
const Pod = require("../models/Pod")

module.exports = {
  getPod: async (req, res) => {
    try {
      const pods = await Pod.find()
      res.render("pods.ejs") 
    } catch (err) {
      console.log(err)
    }
  },
  getPeaPods: async (req, res) => {
    try {
      const pods = await Pod.find({ user: req.user.id })
      res.render("pods.ejs", { pods: pods, user: req.user })
    } catch (err) {
      console.log(err)
    }
  },
  createPod: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      await Pod.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        description: req.body.description,
        user: req.user.id,
      });
      console.log("Pod has been created!")
      res.render("pods.ejs", { pods: pods, user: req.user })
    } catch (err) {
      console.log(err)
    }
  },
  leavePod: async (req, res) => {
    try {
      const pod = await Pod.find({ _id: req.params.id })
      await Pod.remove({ _id: req.params.id });
      res.render("pods.ejs", { pods: pods, user: req.user })
    } catch (err) {
      console.log(err)
    }
  },
  deletePod: async (req, res) => {
    try {
      let pod = await Pod.findById({ _id: req.params.id });
      await mongoose.destroy(pod.cloudinaryId);
      await Pod.remove({ _id: req.params.id });
      console.log("Deleted Pod");
      res.redirect("pods.ejs");
    } catch (err) {
      res.redirect("pods.ejs");
    }
  },
};