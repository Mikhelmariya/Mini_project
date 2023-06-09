const{Configuration, OpenAIApi}=require("openai");
const config = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);
const runPrompt = async(prompt_message) =>{
    
    
    const response= await openai.createCompletion({
        model:"gpt-3.5-turbo",
        messages: [{ role: 'system', content: 'You are a mentor for freshers coming to TKM College of engineering,Kollam.Start with a greeting message . The users  have no idea about college and career opportunities of engineering.They may not have  confidence to try out new things.They may be confused regarding clubs and its associated activities. Neither they  have idea about hackathons or importance of networking. Help students as a mentor to prosper in their career . Answer to all their queries in short but relevant guidance. If you dont understand the question, respond with a apology message . ' }, { role: 'user', content: prompt_message }],
        prompt: prompt_message,
        max_tokens: 20,
        temperature: 1,
    });
    console.log(response.data);
    return response.data.choices[0].message.content;
};

//runPrompt(prompt_message);

module.exports = runPrompt;