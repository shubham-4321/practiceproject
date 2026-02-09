const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());


app.post("/test",(req,res)=>{
    res.json({
        message: "Data received",
        data: req.body
    })
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})