const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middleware/user");
const bcrypt=require ('bcrypt');
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        await userModel.create({
            email: email,
            password: hash,
            firstName: firstName,
            lastName: lastName
        })
        res.status(200).send("Sucess");
    }
    catch(err){
        res.status(500).send("error");
        console.log(err);
    }
    
})

userRouter.post("/signin", async function (req, res) {
    const {email,password} = req.body;
    try {
        const admin = await userModel.findOne({ email:email });
        if (!admin) {
            res.status(404).send("User Not found username");
            return;
        }
        const pass = await bcrypt.compare(password, admin.password);
        if (!pass) {
            res.status(404).send("User Not found");
            return;
        }
        const token = jwt.sign({
            id: admin._id
        }, process.env.JWT_ADMIN_PASSWORD);
        res.json({
            token: token,
            userinfo:admin
        })
    }
    catch (err) {
        res.status(500).send("Error")
        console.log(err);
    }

})

userRouter.get("/purchases", userMiddleware, async function(req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter: userRouter
}