const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const podsController = require("../controllers/pods")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

//Post Routes - simplified for now
router.get("/:id", ensureAuth, podsController.getPod) //query parameter set to get value of post with specific ID

router.post("/createPod", podsController.createPod)

router.delete("/leavePod/:id", podsController.leavePod)

module.exports = router