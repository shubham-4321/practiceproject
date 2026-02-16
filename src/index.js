const express = require("express");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");   
const bcrypt = require("bcryptjs")
require('dotenv').config();
// console.log('PORT:', process.env.PORT);
// console.log('MONGO_URI:', process.env.MONGO_URI);
// console.log('JWT_SECRET:', process.env.JWT_SECRET);
const app = express();
const protected = require("./routes/router");
const { getUser } = require("./controller/controllers");
const router = require("./routes/router");
const User = require("./models/user")
const connectDb = require("./config/db")

connectDb()

app.use(express.json());

function generateToken(userData) {
    const token = jwt.sign({ userData }, process.env.JWT_SECRET, {expiresIn: "24h"});
    return token
}

app.post("/test", (req, res) => {
    res.json({
        message: "Data received",
        data: req.body
    })
});

app.post("/login", (req, res) => {
    const token = generateToken(req.body);
    res.json({
        message: "Token generated",
        token: token
    })
})


// const verification = require("./middleware/authJwt")
// // app.get("/protected",verification,(req,res)=>{
// //     res.json(req.user)
// // })
// const dashboard = require("./controller/controllers")
// app.get("/protected",verification,dashboard)


app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})