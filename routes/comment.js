const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const commentsController = require("../controllers/comments")
const { ensureAuth, ensureGuest } = require("../middleware/auth")


router.post("/createComment/:postID", commentsController.createComment) //postID

router.put("/likeComment/:commentID", commentsController.likeComment) //commentID

router.put("/deleteComment/:commentID", commentsController.deleteComment)//commentID

module.exports = router