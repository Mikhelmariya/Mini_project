const{Configuration, OpenAIApi}=require("openai");
const config = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);
const runPrompt = async(prompt_message) =>{
    
    
    const response= await openai.createCompletion({
        model:"text-davinci-003",
        prompt: prompt_message,
        max_tokens: 20,
        temperature: 1,
    });
    console.log(response.data);
    return response.data;
};

//runPrompt(prompt_message);

module.exports = runPrompt;