const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const podsController = require("../controllers/messages")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.post("/createPod", podsController.createPod)

router.delete("/leavePod/:id", podsController.leavePod)

router.delete("/deletePod/:id", ensureAuth, podsController.deletePod)

module.exports = router