function dashboard(req,res,next){
    res.json({
        message: "Welcome",
        data: req.user
    })
}

function getUser(req,res){
    const id = req.params.id;
    const user = req.user.userData.find(u=>u.id === id)
    if(user){
        res.json(user);
    }
    else{
        res.status(404).json("user not found");
    }
}

module.exports = {dashboard, getUser}