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
    module.exports = {
        welcome: async function (phone_number_id, tocken, from, res) {
          let locations = [
            // {
            //   id: "TVM",
            //   title: "Trivandrum",
            //   description: " ",
            // },
          ];
          console.log("back to the script ");
          // console.log(loc);
          locationsModel
            .find()
            .then((result) => {
              console.log("locations");
              for (i = 0; i < result.length; i++) {
                locations.push({
                  id: "LOC_" + result[i].id,
                  title: result[i].name,
                  description: " ",
                });
              }
              var data = JSON.stringify({
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: from,
                type: "interactive",
                interactive: {
                  type: "list",
                  header: {
                    type: "text",
                    text: "Welcome to Dr Whats",
                  },
                  body: {
                    text: "Happy to help you,Please Select the location where you wish to visit consult the doctor",
                  },
                  footer: {
                    text: "Dr Whats",
                  },
                  action: {
                    button: "Locations",
                    sections: [
                      {
                        title: "Location",
                        rows: locations,
                      },
                    ],
                  },
                },
              });
              sendMessage(phone_number_id, tocken, data, res);
      
              console.log(locations);
      
              return locations;
            })
            .catch((err) => {
              console.log("location error");
              console.log(err);
      
              return locations;
            });
        },}
    
}