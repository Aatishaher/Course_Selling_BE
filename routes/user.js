const {router}=require('express');
const userrouter=router();
    userrouter.post("/user/signin",function(req,res){
        res.json({
            message:"hello"
        })    
    })
    
    userrouter.post("/user/signup",function(req,res){
        res.json({
            message:"hello"
        })    
    })
    userrouter.get("/user/purchase",function(req,res){
        res.json({
            message:"hello"
        })    
    })
module.exports={
    userrouter:userrouter
}
