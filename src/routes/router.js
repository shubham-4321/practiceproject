const express = require("express")
const router = express.Router()
const verification = require("../middleware/authJwt")
const {dashboard, getUser} = require("../controller/controllers")

router.get("/protected",verification,dashboard)
router.get("/getuser/:id",verification,getUser)
module.exports = router