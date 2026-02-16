const jwt = require("jsonwebtoken")
function verification(req,res,next){
    const header = req.headers.authorization;
    if(!header){
        return res.status(401).json("missing header")
    }

    let token;
    if(header.split(" ")[0] !== "Bearer"){
        return res.status(401).json("invalid token")
    }
    else{
        token = header.split(" ")[1];
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded
        next()
    }
    catch{
        return res.status(401).json("error")
    }
}
module.exports = verification