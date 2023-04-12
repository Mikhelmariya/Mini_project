const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
//old tok =EAAKl03DggZBYBAI6kMrIzCqh7HDeNEdj22waZA7dweyPItOeLcnN43Kw1CyTyZAk9zZBLdnT3sZALBqiugPEnTBc6WPZBl6JqwCQ2t9R30DBBzKsxitZCiLfgnumvkHNYy6kmD2iBdM7JzatN3zVt2XHEQ921kcXDZBOheZC9lZBVfyYug5QhAod3A

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
          //  var config = {
          //   method: "post",
          //   maxBodyLength: Infinity,
          //   url: "https://graph.facebook.com/v16.0/" + phone_no_id + "/messages",
          //   headers: {
          //     'Content-Type': "application/json",
          //   },
          //   data: data,
          // };
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://graph.facebook.com/v16.0/100713606293834/messages',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': "Bearer EAAKl03DggZBYBALg6Ogap5d2TOASjTFeL4yfDgwNDLsBUIM9d4w5PKnJObY462RIPAappf7tc6YOZCxt2pkfHlKo7MtcSh7pmU3UkCgt2RgOsqqthMO7UBD3UZA4yjxyRc2c0g3lwNF90lYvU23liOlvZCBDphSCa6jVwhvk7bTU9gBdjXorUgYkrQsrl7T3K5KHWpZCy1wZDZD",

            },
            data : data
          };
          axios.request(config)
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
          let data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": "919207390779",
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
            url: 'https://graph.facebook.com/v16.0/100713606293834/messages',
          
          headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer EAAKl03DggZBYBAF1hoLUZCJDNWHrSXzDvjVj2g45xgrJCr9zJeOW6jnLNkAStfCaybtCrZC2Q98SFOu4IyPb384CxRUVkZBqKVCt77LNnP20PoUiy3is4FXRCXAILjEMYmZARc0NySqxfmrkDdBSL9PenlD6VjZCN0jUibVqfCQONI68Nv5WKP'
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