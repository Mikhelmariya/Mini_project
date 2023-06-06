const{Configuration, OpenAIApi}=require("openai");
const config = new Configuration({
    apiKey:"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",
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