const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const messagesController = require("../controllers/messages")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.post("/createPod", upload.single("file"), messagesController.createPod)

router.delete("/leavePod/:id", messagesController.leavePod)

router.delete("/deletePod/:id", ensureAuth, messagesController.deletePod)

module.exports = router