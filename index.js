const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");

const port=process.env.PORT || 8000;
const app=express();
require('dotenv').config();

 app.use(express.json());

 const tocken="EAAKcYncP8UUBAIWCikOtxiZBooveKpidB05fhjIylnt497ZC3fydPhj6DNAmfS7dMDcrb8zydAGMBTwnQQGcXLTVkRlUYMZBagwWm1F9PVXZAMD4XF74cYBuS7ZAkEtiesW1FYkXNXcsULdn4iaCQG78VTOctdt6jCSWr640XBXxNH3bqi8feDne5AOmjP5zA8m7GMbXOGgZDZD"
 const myTocken="mikhel"


app.get("/webhook",(req,res)=>{
    console.log(`${req.ip} is asking for webhooks`)

    res.send('Here is webhooks for you')
  let mode=req.query["hub.mode"];
  let challenge=req.query["hub.challenge"];
 let token=req.query["hub.verify_token"];
 console.log("0");
//  const mytoken =process.env.MYTOKEN;
//  const accesstoken = process.env.TOKEN;
 
if(mode && token){
    console.log("1")
    if(mode == "subscribe" && token == myTocken){
        console.log("2")
        res.status(200).send(challenge);
    }
    else{
        res.status(403);
        console.log(`${req.ip} mode and token done not done`)
    }
}



});

app.post("/webhooks",(req,res)=>{

    let body_param = req.body;
    //console.log(JSON.stringify(body_param,null,2));

    if(body_param.object){
        console.log("inside body param");
        if(body_param.entry && 
            body_param.entry[0].changes[0]&&
             body_param.entry[0].changes[0].value.messages && 
             body_param.entry[0].changes[0].value.messages[0]){
               
                let phone_no_id = body_param.entry[0].changes[0].values.metadata.phone_number_id;
                let from =body_param.entry[0].changes[0].value.messages[0].from;
                let msg_body = body_param.entry[0].changes[0].values.messages[0].text.body;  
                
        console.log("Phone no id"+phone_no_id);
        res.send(phone_no_id)
        console.log("body param"+msg_body);
        res.send(msg_body)


                
             
                axios({
                    method: "POST",
                    url : " https://graph.facebook.com/v15.0/"+phone_no_id+"/messages?access_token="+tocken,
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
    console.log(`${req.ip} is asking for /`)

   // res.send('Here is something for you')
    
    res.status(200).send("This is webhook setting up");
    
});

app.listen(port,()=> {
    console.log("webhook is listening on"+ port);
});