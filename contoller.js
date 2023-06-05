
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "org-ElsHeEGTNIgAiJNYA5FHHC5s",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

async function getOpenai(prompt) {
    response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        temperature: 0,
        max_tokens: 7,
      });
    return response;
}

export default getOpenai;