const express = require("express");
const router=express.Router(); //Router is an interface

router.get("/", (req, res, next) => {
    console.log("alluser");
    res.status(200).json({
        message:"Hello this is user request"
    });
  });

  module.exports=router;