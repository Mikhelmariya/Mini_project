const userModel = require("../models/userModel");

const express = require("express");
const app = express();
const axios = require("axios");
app.use(express.json());

function sendMessage(phone_number_id, tocken, data, res) {
  var config = {
    method: "post",
    url: "https://graph.facebook.com/v16.0/" + phone_number_id + "/messages",
    headers: {
      Authorization: "Bearer " + tocken,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log("axios sent!");

      res.sendStatus(200);
    })
    .catch(function (error) {
      console.log("axios error!");
      // response.sendStatus(404);
      console.log(error);

      res.sendStatus(400);
    });
    
    
}