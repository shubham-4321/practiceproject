const User = require("../models/user")
const bcrypt = require("bcryptjs")

function dashboard(req,res,next){
    res.json({
        message: "Welcome",
        data: req.user
    })
}

async function getUser(req,res){
    const id = req.user.id;
    const user = await User.findById(id).select("-password")
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

async function changePassword(req,res) {
    try{
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message : "User doesn't exist"})
        }
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        if(oldPassword === newPassword){
            return res.status(400).json({message : "Old and New passwords must be different"})
        }
        const match = await bcrypt.compare(oldPassword,user.password);
        if(match){
            const hashedPassword = await bcrypt.hash(req.body.newPassword,10);
            user.password = hashedPassword;
            await user.save()
            return res.status(200).json({message : "Password changed successfully"})
        }
        else{
            return res.status(400).json({message : "Old password doen't match"})
        }
    }catch(error){
        return res.status(500).json({message : "Error changing password"})
    }
}

module.exports = {dashboard, getUser, updateOne, changePassword}