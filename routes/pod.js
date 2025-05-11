const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const podsController = require("../controllers/pods")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.get("/", podsController.getPod)

router.post("/createPod", podsController.createPod)

router.delete("/leavePod/:id", podsController.leavePod)

router.delete("/deletePod/:id", ensureAuth, podsController.leavePod)

module.exports = router