const {Router}=require('express');

const coursesrouter=Router();


coursesrouter.get("/preview",function(req,res){
    res.json({
        message:"hello"
    })    
})

coursesrouter.post("/purchase",function(req,res){
    res.json({
        message:"hello"
    })    
})



module.exports=coursesrouter;