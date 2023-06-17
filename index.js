const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
const runPrompt = require("./contoller.js");
const listMessage = require("./list_message.js");
const{Configuration, OpenAIApi}=require("openai");
const config = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);
 initialMessageSent = false;

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
        
        if(body_param.entry && 
            body_param.entry[0].changes[0]&&
             body_param.entry[0].changes[0].value.messages && 
             body_param.entry[0].changes[0].value.messages[0]){
                
               
                let phone_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
                let from =body_param.entry[0].changes[0].value.messages[0].from;
                let id =body_param.entry[0].changes[0].value.messages[0].id;
                let msg_body;
                if (body_param.entry[0].changes[0].value.messages[0].text && !initialMessageSent) {
                   msg_body = body_param.entry[0].changes[0].value.messages[0].text;
                   listMessage.list_message(from, async (selectedOption) => {
                    if (selectedOption === "id1") {
                      // Handle option 1 selection
                      console.log("Option 1 selected");
                     }
                     initialMessageSent= true;
                  });
          
                  
                 
} else if (body_param.entry[0].changes[0].value.messages[0].interactive && initialMessageSent) {
  // For interactive messages
  msg_body = body_param.entry[0].changes[0].value.messages[0].interactive.text_input.text;
  console.log("Calling OpenAI");
  openaiResponse = await runPrompt("hii");
}
  else if(body_param.entry[0].changes[0].value.messages[0].text && initialMessageSent)
  
  {
       
                
        console.log("Phone no id :"+phone_no_id);
        console.log("Message from user : "+msg_body);
        console.log("user contact : "+from);
        console.log("id "+id);
        console.log("initial message ;"+initialMessageSent)
       
   

     try {
          console.log("Calling OpenAI");
          openaiResponse = await runPrompt(msg_body);
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





