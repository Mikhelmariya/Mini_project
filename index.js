const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
const runPrompt = require("./contoller.js");
const listMessage = require("./list_message.js");
const welcome=require("./welcome.js")
const{Configuration, OpenAIApi}=require("openai");
const config = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);
 let initialMessageSent = false;
let  selectedOption = "";

const port=process.env.PORT || 8000;
const app=express().use(body_parser.json());
require('dotenv').config();

const myTocken="mikhel"
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
    console.log("Incoming webhook: " + JSON.stringify(body_param));
   if(body_param.object){
        console.log(body_param.entry[0].changes[0].value.messages[0]);
        console.log("initial message"+initialMessageSent)
        
        if(body_param.entry && 
            body_param.entry[0].changes[0]&&
             body_param.entry[0].changes[0].value.messages && 
             body_param.entry[0].changes[0].value.messages[0]){
                
               
                let phone_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
                
                const message = body_param.entry[0].changes[0].value.messages[0];
                const from = message.from;
                const id = message.id;
                if (message.text && !initialMessageSent && selectedOption == "") {
                  // Initial message
                  console.log("Initial message: " + message.text);
                  listMessage.list_message(from);
                  initialMessageSent = true;
                } 
                else if (message.interactive && message.interactive.type === "list_reply") {
                  // Interactive message
                  const optionId = message.interactive.list_reply.id;
                  console.log("Option selected: " + optionId);
                  selectedOption = optionId;
                  if (optionId === "id1") {
                    await welcome.welcome_message(from);
                  }
                } 
                else if (message.text && selectedOption == "id1")
  
                { console.log("inside else if last ai")
                  console.log("Phone no id :"+phone_no_id);
                  console.log("Message from user : "+message.text);
                  console.log("user contact : "+from);
                  console.log("id "+id);
                  console.log("initial message ;"+initialMessageSent)

                  try {
                    console.log("Calling OpenAI");
                    openaiResponse = await runPrompt("hii");
                    console.log("openai response"+openaiResponse);
          
                 } catch (error) {
                    console.error("Error calling OpenAI:", error);
                    console.error("OpenAI Error Response:", error.response.data);
                    console.error("OpenAI Error Status:", error.response.status);
                    console.error("OpenAI Error Headers:", error.response.headers);
                }
                
              reply = openaiResponse.trim();
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
        } 
      
        
       
        };

       

      
    
    
   

      
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





