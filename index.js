const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");


const port=process.env.PORT || 8000;
const app=express().use(body_parser.json());
require('dotenv').config();



 //const tocken="EAAKl03DggZBYBAHQvnZBpcgZAXXewepGeC6jKd9BFiYWR1AXRHbmMafRLWzHelafdLUASGjAcLMg3cF10rCdBq6DW6padhclaCtUIeah8XQBZBNkMDZCm88vZAd6TKEHqaZBbTUMNEbjhO9vm4GsoPTZAJRyZBK9pM66PZCx7Xt6j8g1yJpe1IMRxz"
 const myTocken="mikhel"
 const tocken ="EAAKl03DggZBYBAI6kMrIzCqh7HDeNEdj22waZA7dweyPItOeLcnN43Kw1CyTyZAk9zZBLdnT3sZALBqiugPEnTBc6WPZBl6JqwCQ2t9R30DBBzKsxitZCiLfgnumvkHNYy6kmD2iBdM7JzatN3zVt2XHEQ921kcXDZBOheZC9lZBVfyYug5QhAod3A"


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
        
      function sendMessage(phone_no_id, tocken, data, res) {
          console.log("called send message function");
           var config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://graph.facebook.com/v16.0/" + phone_no_id + "/messages",
            headers: {
              "Authorization": "Bearer EAAKl03DggZBYBAI6kMrIzCqh7HDeNEdj22waZA7dweyPItOeLcnN43Kw1CyTyZAk9zZBLdnT3sZALBqiugPEnTBc6WPZBl6JqwCQ2t9R30DBBzKsxitZCiLfgnumvkHNYy6kmD2iBdM7JzatN3zVt2XHEQ921kcXDZBOheZC9lZBVfyYug5QhAod3A",
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
          
        }
      module.exports ={
        name: function (phone_no_id, tocken, from, res) {
          console.log("Name function called");
          var data = JSON.stringify({
            messaging_product: "whatsapp",
            to: from,
            recipient_type: "individual",
            type: "text",
            text: {
              // type: "list",
              preview_url: false,
              body: "Please enter your name",
            },
          });
          sendMessage(phone_no_id, tocken, data, res);
        },
      } 
    if(msg_body=="Hii"){
      console.log("inside if msg_body");
      module.exports.name(phone_no_id, tocken, from, res);
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