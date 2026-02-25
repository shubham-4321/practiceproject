const express = require("express")
const router = express.Router()
const verification = require("../middleware/authJwt")
const {dashboard, getUser, updateOne} = require("../controller/controllers")
const { register, login } = require("../controller/authController")


router.post("/register",register)
router.post("/login",login)
router.get("/protected",verification,dashboard)
router.get("/getuser/:id",verification,getUser)
router.patch("/updateOne/:id",updateOne)
module.exports = router