const express = require("express")
const router = express.Router()
const verification = require("../middleware/authJwt")
const dashboard = require("../controller/controllers")

router.get("/protected",verification,dashboard)
module.exports = router