const express = require("express")
const router = express.Router()
const verification = require("../middleware/authJwt")
const {dashboard, getUser} = require("../controller/controllers")
const { register, login } = require("../controller/authController")

router.post("/register",register)
router.post("/login",login)
router.get("/protected",verification,dashboard)
router.get("/getuser/:id",getUser)
module.exports = router