const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");

const port=process.env.PORT || 8000;
const app=express().use(body_parser.json());
require('dotenv').config();



 const myTocken="mikhel"
 const tocken="EAAKl03DggZBYBAOM3R2xy4JrYHOPQOjDqIY9xA7jTkaZBNZBSaVw6xew3eUmrTZBL9Pz16jwXyoG2CeYsddyhvuWmOorT1e4RwaFmZBMUxu60gWgJG1AfWf8gnFTG363AZC7tKDvstBrGCBqPfQpeIZBNtuvXiPnTogi8uqd122pbqXRuZBH6XbXGx64pRHGP5OsR2qHQSlKpQZDZD"
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
        
      
      module.exports = {
        name: function (phone_no_id, tocken, from, res) {
          console.log("Name function called");
       
          let data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": "917994186005",
            "type": "interactive",
            "interactive": {
              "type": "list",
              "header": {
                "type": "text",
                "text": "Hey! Welcome!\nI'm your Virtual mentor"
              },
              "body": {
                "text": "I'm here to help you"
              },
              "footer": {
                "text": "Everything you need is here"
              },
              "action": {
                "button": "Options",
                "sections": [
                  {
                    "title": "First year",
                    "rows": [
                      {
                        "id": "<LIST_SECTION_1_ROW_1_ID>",
                        "title": "S1",
                        "description": ""
                      },
                      {
                        "id": "<LIST_SECTION_1_ROW_2_ID>",
                        "title": "S2",
                        "description": ""
                      }
                    ]
                  },
                  {
                    "title": "Second year",
                    "rows": [
                      {
                        "id": "<LIST_SECTION_2_ROW_1_ID>",
                        "title": "S3",
                        "description": ""
                      },
                      {
                        "id": "<LIST_SECTION_2_ROW_2_ID>",
                        "title": "S4",
                        "description": ""
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
              'Authorization': 'Bearer '+tocken 
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
          
           
        },
        
      } 
    if(msg_body=="Hii"){
      console.log("inside if msg_body");
      module.exports.name(phone_no_id, tocken, from, res);
      console.log("id"+id);
    }
    // else if(msg_body=="Hello"){
    //   console.log("inside else msg_body");
    //   module.exports.custom(phone_no_id, tocken, from, res);
    // }
    

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