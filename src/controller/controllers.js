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
        const id = req.params.id;
        await User.updateOne(
            {_id : id},
            {
                $set : req.body,
                $unset : {age : ""}
            }
        )
        res.json({message: "user updated"})
    }catch(error){
        res.json({message: "error updating user"})
    }
}

module.exports = {dashboard, getUser, updateOne}