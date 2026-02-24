const User = require("../models/user")

function dashboard(req,res,next){
    res.json({
        message: "Welcome",
        data: req.user
    })
}

async function getUser(req,res){
    const id = req.params.id;
    const user = await User.findById(id)
    if(user){
        res.json(user);
    }
    else{
        res.status(404).json("user not found");
    }
}

module.exports = {dashboard, getUser}