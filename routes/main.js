const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")
const homeController = require("../controllers/home")
const postsController = require("../controllers/posts")
const { ensureAuth, ensureGuest } = require("../middleware/auth")
const messagesController = require("../controllers/messages")

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile) //ensuring we're logged in and use post controller to use profile method
router.get("/feed", ensureAuth, postsController.getFeed) //get request with feed route -> check to ensure person is logged in -> post controller with get feed method; hold command and hover over
router.get("/login", authController.getLogin)
router.post("/login", authController.postLogin)
router.get("/logout", authController.logout)
router.get("/signup", authController.getSignup)
router.post("/signup", authController.postSignup)
router.get("/pod", messagesController.getMessages)

module.exports = router