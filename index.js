require('dotenv').config();
const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
const runPrompt = require("./contoller.js");
const listMessage = require("./list_message.js");
const welcome=require("./welcome.js")
const{Configuration, OpenAIApi}=require("openai");
const rateLimit = require("express-rate-limit");

let  selectedOption = " ";
var initialMessageSent=false;
const port=process.env.PORT || 8000;
const app=express().use(body_parser.json());
const myTocken="mikhel"

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 10 requests per minute
  message: "Too many requests from this IP, please try again later.",
});

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

app.post("/webhook",limiter,async (req,res)=>{
   try{
    const body_param = await req.body;
    console.log("Incoming webhook: " + JSON.stringify(body_param));
    if(body_param.object){
        console.log(body_param.entry[0].changes[0].value.messages[0]);
        console.log("selected option before everything"+selectedOption)
        console.log("initial message before everything"+initialMessageSent)
    
        
        if(body_param.entry && 
            body_param.entry[0].changes[0]&&
             body_param.entry[0].changes[0].value.messages && 
             body_param.entry[0].changes[0].value.messages[0]){
                 
               
                let phone_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
                const message = body_param.entry[0].changes[0].value.messages[0];
                const from = message.from;
                const id = message.id;
                
              
                let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
                if (shouldGenerateResponse(msg_body)){
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
                await sendResponseToUser(from, reply);
              
                }
             
              }
    }
    res.sendStatus(200);
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.sendStatus(500);
  }

            function shouldGenerateResponse(message) {
              // Check if the message is not empty and contains user input
              // Modify this condition based on your specific requirements
              return message && message.trim().length > 0;
            }
            async function sendResponseToUser(recipient, response) {
              try{
                await axios.post(
                  process.env.WHATSAPP_SEND_MESSAGE_API,
                  {
                    messaging_product: "whatsapp",
                    recipient_type: "individual",
                    to: recipient,
                    type: "text",
                    text: {
                      preview_url: true,
                      body: response,
                    },
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + process.env.WHATSAPP_ACCESS_TOKEN,
                    },
                  }
                );
              }catch(error){
                console.log(error);
              }
            }
           
              }

     
        //         if (message.text &&  selectedOption == " ") {
        //           // Initial message
        //           console.log("Initial message inside list loop: " + message.text.body);
        //           
              
        //        } 
        //         else if (message.interactive && message.interactive.type == "list_reply") {
        //           // Interactive message
        //           const optionId = message.interactive.list_reply.id;
        //           console.log("Option selected: " + optionId);
        //           selectedOption = optionId;
        //           if (optionId === "id1") {
        //           await welcome.welcome_message(from);
        //           initialMessageSent=true;
        //           console.log("selected option inside list message :"+selectedOption)
        //           console.log("initial message inside text message content ;"+initialMessageSent)

        //           }
                  
        //         } 
        //         initialMessageSent=true;

        // }
        
                
                
                 
  
              //     console.log("initial message true or false after loop"+initialMessageSent)
              //     console.log("Phone no id :"+phone_no_id);
              //     console.log("Message from user : "+message.text);
              //     console.log("user contact : "+from);
              //     console.log("id "+id);
              //     console.log("initial message ;"+initialMessageSent)
              //     let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
              //     try {
              //       console.log("Calling OpenAI");
              //       openaiResponse = await runPrompt(msg_body);
              //       console.log("openai response"+openaiResponse);
          
              //    } catch (error) {
              //       console.error("Error calling OpenAI:", error);
              //       console.error("OpenAI Error Response:", error.response.data);
              //       console.error("OpenAI Error Status:", error.response.status);
              //       console.error("OpenAI Error Headers:", error.response.headers);
              //   }
                
              // reply = openaiResponse.trim();
              // await axios.post(
              //   process.env.WHATSAPP_SEND_MESSAGE_API,
              //   {
              //     messaging_product: "whatsapp",
              //     recipient_type: "individual",
              //     to: from,
              //     type: "text",
              //     text: {
              //       preview_url: false,
              //       body: reply,
              //     },
              //   },
              //   {
              //     headers: {
              //       Authorization: "Bearer " + process.env.WHATSAPP_ACCESS_TOKEN,
              //     },
              //   }
              // );
        
   
      
  );
app.get("/",(req,res)=>{
    console.log(`${req.ip} is asking for /`)
    res.status(200).send("This is webhook setting up");
    
});

app.listen(port,()=> {
    console.log("webhook is listening on "+ port);
});





