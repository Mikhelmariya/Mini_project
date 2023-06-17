const axios = require('axios');


module.exports = {
  list_message: async function(from,callback) {
   // console.log("inside list message, selected option callback is "+callback);
    const data = JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: from,
      type: 'interactive',
      interactive: {
        type: 'list',
        header: {
          type: 'text',
          text: '<HEADER_TEXT>',
        },
        body: {
          text: '<BODY_TEXT>',
        },
        footer: {
          text: '<FOOTER_TEXT>',
        },
        action: {
          button: '<BUTTON_TEXT>',
          sections: [
            {
              title: '<LIST_SECTION_1_TITLE>',
              rows: [
                {
                  id: 'id1',
                  title: 'Computer Science',
                  description: '<SECTION_1_ROW_1_DESC>',
                },
                {
                  id: '<LIST_SECTION_1_ROW_2_ID>',
                  title: '<SECTION_1_ROW_2_TITLE>',
                  description: '<SECTION_1_ROW_2_DESC>',
                },
              ],
            },
            {
              title: '<LIST_SECTION_2_TITLE>',
              rows: [
                {
                  id: '<LIST_SECTION_2_ROW_1_ID>',
                  title: '<SECTION_2_ROW_1_TITLE>',
                  description: '<SECTION_2_ROW_1_DESC>',
                },
                {
                  id: '<LIST_SECTION_2_ROW_2_ID>',
                  title: '<SECTION_2_ROW_2_TITLE>',
                  description: '<SECTION_2_ROW_2_DESC>',
                },
              ],
            },
          ],
        },
      },
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://graph.facebook.com/v13.0/100713606293834/messages',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.WHATSAPP_ACCESS_TOKEN,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
    
    if (typeof callback === 'function') {
      callback();
    }
    
    // Update the initial message status for the user
    

},
};
