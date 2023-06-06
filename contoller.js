
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: "org-ElsHeEGTNIgAiJNYA5FHHC5s",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



async function getOpenai(prompt_message) {
    const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: prompt_message,
  temperature: 0,
  max_tokens: 20,
  top_p: 1,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
  stop: ["\n"],
});
    return response;
}

module.exports = getOpenai;