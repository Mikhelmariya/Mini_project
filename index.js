const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
//old tok =EAAKl03DggZBYBAI6kMrIzCqh7HDeNEdj22waZA7dweyPItOeLcnN43Kw1CyTyZAk9zZBLdnT3sZALBqiugPEnTBc6WPZBl6JqwCQ2t9R30DBBzKsxitZCiLfgnumvkHNYy6kmD2iBdM7JzatN3zVt2XHEQ921kcXDZBOheZC9lZBVfyYug5QhAod3A

const port=process.env.PORT || 8000;
const app=express().use(body_parser.json());
require('dotenv').config();



 const myTocken="mikhel"
 const tocken="EAAKl03DggZBYBAHZAQeyLjvMSk0TtB6pbiTSrCW3NrnrZCjXoNupFXkDKZA8DpQmkXL5FCZCxh065QsGRZAgrhhIsGTZBqzex2fc8UlnwFbCi3i61uCo6TuNXLHubxtgCHxmG0m3ZCwQNorogIo5Dgw2KdLpncmMNVZAHCWIo5H4Fs5K3hf7Jv9h9u3ayi0miZAZCuLvkEqvIXGggZDZD"
app.get("/webhook",(req,res)=>{
let mode= req.query["hub.mode"];
let challange= req.query["hub.challenge"];
let token= req.query["hub.verify_token"];


if(mode && token){
    console.log("1")
    if(mode == "subscribe" && token == myTocken){
        console.log("2")
        res.status(200).send(challange);
    }
    else{
        res.status(403);
        console.log("else")
        console.log(`${req.ip} mode and token done not done`)
    }
}
else{
    console.log("else condition");
}



});

app.post("/webhook",(req,res)=>{

    let body_param = req.body;

    if(body_param.object){
        console.log(body_param.entry[0].changes[0].value.messages[0]);
        
        if(body_param.entry && 
            body_param.entry[0].changes[0]&&
             body_param.entry[0].changes[0].value.messages && 
             body_param.entry[0].changes[0].value.messages[0]){
                console.log("2");
               
                let phone_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
                console.log("3");
                let from =body_param.entry[0].changes[0].value.messages[0].from;
                let id =body_param.entry[0].changes[0].value.messages[0].id;

                let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
          
       
                
        console.log("Phone no id :"+phone_no_id);
        console.log("Message from user : "+msg_body);
        console.log("user contact : "+from);
        console.log("id "+id);
        console.log(body_param.entry[0].changes[0].value.messages[0].type);
        
      
      module.exports ={
        name: function (phone_no_id, tocken, from, res) {
          console.log("Name function called");
       
          let data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": from,
            "type": "template",
            "template": {
              "name": "hello_world",
              "language": {
                "code": "en_US"
              }
            }
          });
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://graph.facebook.com/v13.0/100713606293834/messages',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer EAAKl03DggZBYBAHZAQeyLjvMSk0TtB6pbiTSrCW3NrnrZCjXoNupFXkDKZA8DpQmkXL5FCZCxh065QsGRZAgrhhIsGTZBqzex2fc8UlnwFbCi3i61uCo6TuNXLHubxtgCHxmG0m3ZCwQNorogIo5Dgw2KdLpncmMNVZAHCWIo5H4Fs5K3hf7Jv9h9u3ayi0miZAZCuLvkEqvIXGggZDZD'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
          
          // sendMessage(phone_no_id, tocken, data, res);
        },
        event: function (phone_no_id, tocken, from, res) {
          
          let data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": "918714013839",
            "type": "interactive",
            "interactive": {
              "type": "list",
              "header": {
                "type": "text",
                "text": "<HEADER_TEXT>"
              },
              "body": {
                "text": "<BODY_TEXT>"
              },
              "footer": {
                "text": "<FOOTER_TEXT>"
              },
              "action": {
                "button": "Event Categories",
                "sections": [
                  {
                    "title": "Technical Events",
                    "rows": [
                      {
                        "id": "<LIST_SECTION_1_ROW_1_ID>",
                        "title": "<SECTION_1_ROW_1_TITLE>",
                        "description": "<SECTION_1_ROW_1_DESC>"
                      },
                      {
                        "id": "<LIST_SECTION_1_ROW_2_ID>",
                        "title": "<SECTION_1_ROW_2_TITLE>",
                        "description": "<SECTION_1_ROW_2_DESC>"
                      }
                    ]
                  },
                  {
                    "title": "Cultural Events",
                    "rows": [
                      {
                        "id": "<LIST_SECTION_2_ROW_1_ID>",
                        "title": "<SECTION_2_ROW_1_TITLE>",
                        "description": "<SECTION_2_ROW_1_DESC>"
                      },
                      {
                        "id": "<LIST_SECTION_2_ROW_2_ID>",
                        "title": "<SECTION_2_ROW_2_TITLE>",
                        "description": "<SECTION_2_ROW_2_DESC>"
                      },
                      {
                        "title": "Pro Show",
                        "rows": [
                          {
                            "id": "<LIST_SECTION_1_ROW_1_ID>",
                            "title": "<SECTION_1_ROW_1_TITLE>",
                            "description": "<SECTION_1_ROW_1_DESC>"
                          },
                          {
                            "id": "<LIST_SECTION_1_ROW_2_ID>",
                            "title": "<SECTION_1_ROW_2_TITLE>",
                            "description": "<SECTION_1_ROW_2_DESC>"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            }
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://graph.facebook.com/v13.0/100713606293834/messages',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer EAAKcYncP8UUBAOCZCsR4eChztgnsNwhZAiY60POyDZBcZB5ER0acKbqC4AF3cHAmYHwDVa7ThZAzoZB7Vpfb0GBxSHyZB3iBDbAoHMraVffF8e23oajayugG588JrvVzHuZAIVonfgsxUtiZAvyzBlamqENvFmr1CBwMcTo5mCAVKOQZBZCaxQtX6Gw'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
          
          
          
        }
      } 
    if(msg_body=="Hii"){
      console.log("inside if msg_body");
      module.exports.name(phone_no_id, tocken, from, res);
    }
    else if(msg_body=="Event"){
      module.exports.event(phone_no_id, tocken, from, res);
    }
    

      }
             }
      }
            
   
);
app.get("/",(req,res)=>{
    console.log(`${req.ip} is asking for /`)
    res.status(200).send("This is webhook setting up");
    
});

app.listen(port,()=> {
    console.log("webhook is listening on "+ port);
});