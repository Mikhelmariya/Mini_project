module.exports={
    welcome_message: async function(from){
        const axios = require('axios');
        let data = JSON.stringify({
          "messaging_product": "whatsapp",
          "recipient_type": "individual",
          "to":from,
          "type": "text",
          "text": {
            "preview_url": false,
            "body": "text-message-content"
          }
        });
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://graph.facebook.com/v17.0/100713606293834/messages',
          headers: { 
            'Authorization': 'Bearer '+ process.env.WHATSAPP_ACCESS_TOKEN, 
            'Content-Type': 'application/json'
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
        
    }
}