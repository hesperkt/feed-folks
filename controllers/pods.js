// const cloudinary = require("../middleware/cloudinary")
// const mongoose = require("mongoose")
// const Pod = require("../models/Pod")
// const Comment = require("../models/Comment")

// module.exports = {
//   getPods: async (req, res) => {
//     try {
//       const pods = await Pod.find().sort({ createdAt: "desc" }).lean()
//       res.render("pods.ejs") 
//     } catch (err) {
//       console.log(err)
//     }
//   },
//   getPod: async (req, res) => {
//     try {
//       const pod = await Pod.findById(req.params.id) //go to Post and find post that meets query parameter (with specific ID; can change name of this item if POST routes is changed too) and send to ejs
//       const messages = await Message.find({postID:req.params.id, delete:false})
//       res.render("pods.ejs", { pod: pod, user: req.user, messages: messages })
//     } catch (err) {
//       console.log(err)
//     }
//   },
//   createPod: async (req, res) => {
//     try {
//       const date = Date.now()
//       const result = await cloudinary.uploader.upload(req.file.path);

//       await Pod.create({
//         podName: req.body.podName,
//         image: result.secure_url,
//         cloudinaryId: result.public_id,
//         description: req.body.description,
//         user: req.user.id,
//       });
//       console.log("Pod has been created!")
//       res.render("pods.ejs", { pods: pods, user: req.user })
//     } catch (err) {
//       console.log(err)
//     }
//   },
//   deletePod: async (req, res) => {
//     try {
//       let pod = await Pod.findById({ _id: req.params.id });
//       await mongoose.destroy(pod.cloudinaryId);
//       await Pod.remove({ _id: req.params.id });
//       console.log("Deleted Pod");
//       res.redirect("pods.ejs");
//     } catch (err) {
//       res.redirect("pods.ejs");
//     }
//   },
// };