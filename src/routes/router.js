const express = require("express")
const router = express.Router()
const verification = require("../middleware/authJwt")
const {dashboard, getUser, updateOne, changePassword} = require("../controller/controllers")
const { register, login } = require("../controller/authController")


router.post("/register",register)
router.post("/login",login)
router.get("/protected",verification,dashboard)
router.get("/getuser/:id",verification,getUser)
router.patch("/updateOne/:id",verification,updateOne)
router.patch("/changePassword",verification,changePassword)
module.exports = router