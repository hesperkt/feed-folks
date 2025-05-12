const cloudinary = require("../middleware/cloudinary")
const Message = require("../models/Message")
const Pod = require("../models/Pod")

module.exports = {
  getPods: async (req, res) => {
    try {
      const pods = await Pod.find().sort({ createdAt: "desc" }).lean()
      res.render("pods.ejs", { pods: pods })
    } catch (err) {
      console.log(err)
    }
  },
    getMessages: async (req, res) => {
        try {
          const messages = await Message.find().populate("user")
          res.render("messages.ejs", { user: req.user , messages : messages }) 
        } catch (err) {
          console.log(err)
        }
    },
    createPod: async (req, res) => {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
  
        await Pod.create({
          podName: req.body.podName,
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
        const pods = await Pod.find({ _id: req.params.id })
        await Pod.remove({ _id: req.params.id });
        res.render("pods.ejs", { pods: pods, user: req.user })
      } catch (err) {
        console.log(err)
      }
    },
    deletePod: async (req, res) => {
      try {
        let pods = await Pod.findById({ _id: req.params.id });
        await mongoose.destroy(pod.cloudinaryId);
        await Pod.remove({ _id: req.params.id });
        console.log("Deleted Pod");
        res.redirect("pods.ejs");
      } catch (err) {
        res.redirect("pods.ejs");
      }
    }
};
