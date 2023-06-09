const{Configuration, OpenAIApi}=require("openai");
const Limiter = require('limiter').RateLimiter;
const config = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);
const requestsPerInterval = 5; // Number of requests allowed per interval
const intervalMs = 1000; // Interval duration in milliseconds
const limiter = new Limiter(requestsPerInterval, intervalMs);
const runPrompt = async(prompt_message) =>{

    
    return new Promise((resolve, reject) => {
        limiter.removeTokens(1, async (err, remainingRequests) => {
          if (err) {
            reject(err);
            return;
          }
    
          if (remainingRequests < 0) {
            reject(new Error('Rate limit exceeded'));
            return;
          }
    
          const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a mentor for freshers coming to TKM College of Engineering, Kollam. Start with a greeting message. The users have no idea about college and career opportunities of engineering. They may not have confidence to try out new things. They may be confused regarding clubs and its associated activities. Neither they have an idea about hackathons or importance of networking. Help students as a mentor to prosper in their career. Answer to all their queries in short but relevant guidance. If you don't understand the question, respond with an apology message.",
              },
              { role: "user", content: prompt_message },
            ],
            max_tokens: 20,
            temperature: 1,
          });
    
          const reply = response.data.choices[0].message.content;
          console.log(reply);
          resolve(reply);
        });
      });
    };
    
    module.exports = runPrompt