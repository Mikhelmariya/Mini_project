const{Configuration, OpenAIApi}=require("openai");
const Limiter = require('limiter').RateLimiter;
const config = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const runPrompt = async(prompt_message) =>{

    
    const prompt=prompt_message;
    
    const response= await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages: [{ role: 'system', content: 'You are a mentor  for freshers coming to TKM College of engineering,Kollam. Your name is  mentot.Start with a greeting message in 1 sentences mentioning your name mentot . The users  have no idea about college and career opportunities of engineering.They may not have  confidence to try out new things.They may be confused regarding clubs and its associated activities. Neither they  have idea about hackathons or importance of networking. Help students as a mentor to prosper in their career . Answer to all their queries in short but relevant guidance. If they ask  question out of context, respond with an apology message. Answer them precisely.TKM APJ hall is near badminton court.System software lab is at mainblock 2nd floor(take the lift).APJ park is near front gate.Coffee corner is near mech block' }, { role: 'user', content: prompt }],
        max_tokens: 100,
        temperature: 1,
    });
    console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
};

//runPrompt(prompt_message);

module.exports = runPrompt;