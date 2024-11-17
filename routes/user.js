const {Router}=require('express');
const userrouter=Router();
    userrouter.post("/signin",function(req,res){
        res.json({
            message:"hello"
        })    
    })
    
    userrouter.post("/signup",function(req,res){
        res.json({
            message:"hello"
        })    
    })
    userrouter.get("/purchase",function(req,res){
        res.json({
            message:"hello"
        })    
    })
module.exports=userrouter
