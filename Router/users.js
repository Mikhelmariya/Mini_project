const express = require("express");
const router=express.Router(); //Router is an interface
const userModel = require("./models/userModel")

router.get("/", (req, res, next) => {
    console.log("alluser");
    userModel.find()
      .then((result) => {
        result = { data: result };
  
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.post("/addUser", (req, res, next) => {
      console.log("adduser");
      
    const user = new userModel({
      name: req.body.name,
      phone: req.body.phone,
    });
    user
      .save()
      .then((result) => {
        res.send(result);
        res.status(200).json({
          message: "update successful",
          name: req.body.name,
          phone: req.body.phone,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  module.exports=router;