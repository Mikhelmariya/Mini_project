
const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
//const { getOpenai } = require("./contoller"); // Replace "./controller" with the actual path to your controller.js file
const  getOpenai  = require("./contoller.js");


const runPrompt = require("./contoller.js");


const port=process.env.PORT || 8000;
const app=express().use(body_parser.json());
require('dotenv').config();

const myTocken="mikhel"
const tocken="EAAKl03DggZBYBABhUAU2tFBnczc17SjeSeEb3PKYQXTuiboGmxMwgn5VAtbbaBinxx3uO1l9U3w9yMYQb3x6GP2qSEZBZB5fKlwZAxKpUvIZBZCb8zLUAtayaaZA8yZBSQXDzLBLQFgaucv0GdrtVhYAZASOgnylV9Vp8rZAKyZALfXKyX7Tc6gcER1SdXzi0GKUxuWpaodzZBrkHAZDZD"
app.get("/webhook",(req,res)=>{
let mode= req.query["hub.mode"]
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

app.post("/webhook",async (req,res)=>{

    const body_param = req.body;
    //check the incoming webhook message 
    console.log("Incoming webhook: " + JSON.stringify(body_param));
   // Validate the webhook
    if(body_param.object){
        console.log(body_param.entry[0].changes[0].value.messages[0]);
        
        if(body_param.entry && 
            body_param.entry[0].changes[0]&&
             body_param.entry[0].changes[0].value.messages && 
             body_param.entry[0].changes[0].value.messages[0]){
                
               
                let phone_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
                let from =body_param.entry[0].changes[0].value.messages[0].from;
                let id =body_param.entry[0].changes[0].value.messages[0].id;
                let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
          
       
                
        console.log("Phone no id :"+phone_no_id);
        console.log("Message from user : "+msg_body);
        console.log("user contact : "+from);
        console.log("id "+id);

        const queue = [];
        let isProcessing = false;
        const processQueue = async () => {
          if (isProcessing || queue.length === 0) {
            return;
          }
        
          isProcessing = true;
          const { msg_body, from } = queue.shift();
        
        try {
          console.log("Calling OpenAI");
          openaiResponse = await runPrompt(msg_body);
          console.log(response);
          // Handle the response from OpenAI here
        } catch (error) {
          console.error("Error calling OpenAI:", error);
          // Handle the error
        }
         ///reply= "Sorry, I didn't get you";
      
  
          //const openaiResponse = await runPrompt(msg_body);
          console.log("openai response"+openaiResponse);
          reply = openaiResponse.trim();
          console.log("Reply from openai : "+reply);
          console.log("reply to string"+reply.toString());
        
        

        
       await axios.post(
          process.env.WHATSAPP_SEND_MESSAGE_API,
          {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: from,
            type: "text",
            text: {
              preview_url: false,
              body: reply,
            },
          },
          {
            headers: {
              Authorization: "Bearer " + process.env.WHATSAPP_ACCESS_TOKEN,
            },
          }
        );

        isProcessing = false;
        processQueue(); 
       
        };



      
      module.exports = {
        name: function (phone_no_id, tocken, from, res) {
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
                    "title": "",
                    "rows": [
                      {
                        "id": "<LIST_SECTION_1_ROW_1_ID>",
                        "title": "Coding club",
                        "description": ""
                      },
                      {
                        "id": "<LIST_SECTION_1_ROW_2_ID>",
                        "title": "IEDC",
                        "description": ""
                      }
                    ]
                  },
                  {
                    "title": "",
                    "rows": [
                      {
                        "id": "<LIST_SECTION_2_ROW_1_ID>",
                        "title": "CSI",
                        "description": ""
                      },
                      {
                        "id": "<LIST_SECTION_2_ROW_2_ID>",
                        "title": "IEEE",
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
            url: 'https://graph.facebook.com/v16.0/100713606293834/messages',
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
     //module.exports.name(phone_no_id, tocken, from, res);
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