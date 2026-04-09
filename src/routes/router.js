const express = require("express")
const router = express.Router()
const verification = require("../middleware/authJwt")
const {dashboard, getUser, updateOne, changePassword, deleteUser} = require("../controller/controllers")
const { register, login } = require("../controller/authController")
const { registerValidation, loginValidation, validate } = require("../middleware/validation")


router.post("/register",registerValidation,validate,register)
router.post("/login",loginValidation,validate,login)
router.get("/protected", verification, dashboard)
router.get("/getuser/:id", verification, getUser)
router.patch("/updateOne/:id", verification, updateOne)
router.patch("/changePassword", verification, changePassword)
router.delete("/deleteUser", verification, deleteUser)
module.exports = router