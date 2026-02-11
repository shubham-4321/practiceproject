const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();
const port = 3000;
const protected = require("./routes/router")

app.use(express.json());

function generateToken(userData){
    const token = jwt.sign({userData},SECRET_KEY,expiry);
    return token
}

app.post("/test",(req,res)=>{
    res.json({
        message: "Data received",
        data: req.body
    })
});

app.post("/login",(req,res)=>{
    const token = generateToken(req.body);
    res.json({
        message: "Token generated",
        token: token
    })
})

const SECRET_KEY = "secretkey1234"

const expiry = {
    expiresIn: "24h"
}

// const verification = require("./middleware/authJwt")
// // app.get("/protected",verification,(req,res)=>{
// //     res.json(req.user)
// // })
// const dashboard = require("./controller/controllers")
// app.get("/protected",verification,dashboard)


app.use("/",protected)

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})