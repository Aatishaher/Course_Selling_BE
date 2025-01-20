const { Router } = require("express");
const adminRouter = Router();
const {adminModel,courseModel}=require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { adminMiddleware } = require("../middleware/admin");
require('dotenv').config();
const mongoose=require("mongoose");

adminRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        await adminModel.create({
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

adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    try {
      const admin = await adminModel.findOne({ email: email });
      if (!admin) {
        return res.status(404).send("User not found with the provided email");
      }
      const pass = await bcrypt.compare(password, admin.password);
      if (!pass) {
        return res.status(401).send("Incorrect password");
      }
      const token = jwt.sign({ id: admin._id }, process.env.JWT_ADMIN_PASSWORD);
      return res.status(200).json({
        token: token,
        userinfo: admin
      });
  
    } catch (err) {
      console.error("Error occurred during signin:", err);
      return res.status(500).send("Internal server error");
    }
  });
  

adminRouter.post("/course",adminMiddleware, async function (req, res) {
    const { title, description, price } = req.body;
    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const { title, description, imageUrl, price, courseId } = req.body;
    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    });

    res.json({
        message: "Course updated",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}