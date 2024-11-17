const {router}=require('express');

const coursesrouter=router();


app.get("/courses/preview",function(req,res){
    res.json({
        message:"hello"
    })    
})

app.post("/courses/purchase",function(req,res){
    res.json({
        message:"hello"
    })    
})



module.exports={
    coursesrouter:coursesrouter
};