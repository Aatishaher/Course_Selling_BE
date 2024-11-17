const express=require('express');
const app=express();
const coursesrouter=require("./routes/course");
const userrouter=require("./routes/user");

app.use("/user",userrouter);
app.use("/courses",coursesrouter);

app.listen(3000,function(req,res){
    console.log("Working");
});