const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");

const port=process.env.PORT || 8000;
const app=express();
require('dotenv').config();

 app.use(express.json());

 const tocken="EAAKl03DggZBYBAHQvnZBpcgZAXXewepGeC6jKd9BFiYWR1AXRHbmMafRLWzHelafdLUASGjAcLMg3cF10rCdBq6DW6padhclaCtUIeah8XQBZBNkMDZCm88vZAd6TKEHqaZBbTUMNEbjhO9vm4GsoPTZAJRyZBK9pM66PZCx7Xt6j8g1yJpe1IMRxz"
 const myTocken="mikhel"


app.get("/webhook",(req,res)=>{
    //console.log(`${req.ip} is asking for webhooks`)
   //console.log(JSON.stringify(body_param,null,2));
   // res.send('Here is webhooks for you')
  let mode= req.query["hub.mode"];
  let challange= req.query["hub.challenge"];
 let token= req.query["hub.verify_token"];
 console.log("0");

 console.log("mode :"+mode);
 console.log("token :"+token);
 console.log("mytoken :"+myTocken);
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
    console.log(JSON.stringify(body_param,null,2));

    if(body_param.object){
        console.log("inside body param");
        console.log("entry"+body_param.entry);
        console.log("messages"+body_param.entry[0].changes[0].value.messages);


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
                    url : "https://graph.facebook.com/v15.0/"+phone_no_id+"/messages?access_token="+tocken,
                    data: {
                        messaging_product : "whatsapp",
                        to: from,
                        text : {
                            body:"Hi"
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
    console.log("webhook is listening on "+ port);
});