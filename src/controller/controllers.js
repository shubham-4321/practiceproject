const User = require("../models/user")
const bcrypt = require("bcryptjs")

function dashboard(req,res,next){
    res.json({
        message: "Welcome",
        data: req.user
    })
}

async function getUser(req,res){
    const id = req.params.id;
    const user = await User.findById(id)
    if(req.user.id != id){
        return res.status(403).json({message: "access denied"})
    }
    if(user){
        res.json(user);
    }
    else{
        res.status(404).json("user not found");
    }
}

async function updateOne(req,res){
    try{
        const update = { $set: {}, $unset: {}}
        for(const key in req.body){
            if(req.body[key] === null){
                update.$unset[key] = ""
            }
            else{
                if(key === "password"){
                    req.body[key] = await bcrypt.hash(req.body[key], 10)
                }
                update.$set[key] = req.body[key]
            }
        }
        await User.updateOne({_id: req.params.id}, update)
        res.json({message: "user updated"})
    }catch(error){
        res.json({message: "error updating user"})
    }
}

module.exports = {dashboard, getUser, updateOne}