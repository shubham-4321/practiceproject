function dashboard(req,res,next){
    res.json({
        message: "Welcome",
        data: req.user
    })
}
module.exports = dashboard