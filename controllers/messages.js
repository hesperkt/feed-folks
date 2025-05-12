const cloudinary = require("../middleware/cloudinary")
const Message = require("../models/Message")

module.exports = {
    getMessages: async (req, res) => {
        try {
          const messages = await Message.find().populate("user")
          res.render("messages.ejs", { user: req.user , messages : messages }) 
        } catch (err) {
          console.log(err)
        }
    }
};
