const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
require('dotenv').config();

const app = express().use(body_parser.json());

app.listen(process.env.PORT,()=> {
    console.log("webhook is listening");
});


app.get("/webhook",(req,res)=>{
  let mode =req.query["hub.mode"];
  let challenge =req.query["hub.challenge"];
 let token= req.query["hub.verify_token"];

 const mytoken =process.env.mytoken;
 const accesstoken = process.env.accesstoken;
 
if(mode && token){
    if(mode=="subscribe" && token==mytoken){
        res.status(200).send(challenge);
    }
    else{
        res.status(403);
    }
}



});

app.post("/webhooks",(req,res)=>{

    let body_param = req.body;
    console.log(JSON.stringify(body_param,null,2));

    if(body_param.object){
        if(body_param.entry && 
            body_param.entry[0].changes[0]&&
             body_param.entry[0].changes[0].value.message && 
             body_param.entry[0].changes[0].value.message[0]){
               
                let phone_no_id = body_param.entry[0].changes[0].values.metadata.phone_number_id;
                let from =body_param.entry[0].changes[0].value.messages[0].from;
                let msg_body = body_param.entry[0].changes[0].values.messages[0].text.body;    
             
                axios({
                    method: "POST",
                    url : " https://graph.facebook.com/v15.0/"+phone_no_id+"/messages?access_token="+accesstoken,
                    data: {
                        messaging_product : "whatsapp",
                        to: from,
                        text : {
                            body:"Hii I am TKM Chatbot , Are you all good?"
                        }

                    },
                    headers: {
                        "Content-Type": "application/json"
                    }

                });
                res.sendStatus(200);
            }else
            {
                res.sendStatus(404);
            }
    }
});
app.get("/",(req,res)=>{
    res.status(200).send("This is webhook setting up");
});