const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
app.use(morgan("dev"));

const port=process.env.PORT || 8000;
const app=express().use(body_parser.json());
require('dotenv').config();


const { default: mongoose } = require("mongoose");
const morgan = require("morgan");

const user = require("../models/userModel");
const userRouter = require("./Router/users");

 //app.use(express.json());

 //const tocken="EAAKl03DggZBYBAHQvnZBpcgZAXXewepGeC6jKd9BFiYWR1AXRHbmMafRLWzHelafdLUASGjAcLMg3cF10rCdBq6DW6padhclaCtUIeah8XQBZBNkMDZCm88vZAd6TKEHqaZBbTUMNEbjhO9vm4GsoPTZAJRyZBK9pM66PZCx7Xt6j8g1yJpe1IMRxz"
 const myTocken="mikhel"
 const tocken ="EAAKl03DggZBYBAI6kMrIzCqh7HDeNEdj22waZA7dweyPItOeLcnN43Kw1CyTyZAk9zZBLdnT3sZALBqiugPEnTBc6WPZBl6JqwCQ2t9R30DBBzKsxitZCiLfgnumvkHNYy6kmD2iBdM7JzatN3zVt2XHEQ921kcXDZBOheZC9lZBVfyYug5QhAod3A"


app.get("/webhook",(req,res)=>{
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
   // console.log(JSON.stringify(body_param,null,2));

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
                let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
          
       
                
        // console.log("Phone no id"+phone_no_id);
        // res.send(phone_no_id)
        // console.log("body param"+msg_body);
        // res.send(msg_body)

   
        console.log("inside body param");
        console.log(
            body_param.entry[0].changes[0].value.messages[0].type == "text"
          );
          
             
                // axios({
                //     method: "POST",
                //     url : "https://graph.facebook.com/v16.0/"+phone_no_id+"/messages?access_token="+tocken,
                //     data: {
                //         messaging_product : "whatsapp",
                //         to: from,
                //         text : {
                //             body:"Hi Megna"
                //         }

                //     },
                //     headers: {
                //         "Content-Type": "application/json"
                //     }

                // })
                // .then((response) => {
                //     console.log(response.data);
                //     //res.sendStatus(200);
                //   })
                //   .catch((error) => {
                //     console.log("error in axiox/post");
                //     console.error(error.response.data);
                //     //res.sendStatus(500);
                //   });
              } else {
                res.sendStatus(404);
              }
                
               // console.log("axios  called");

            }else
            {
                res.sendStatus(404);
                //console.log("axios not called");
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