


import { Configuration, OpenAIApi } from "openai";


const OPENAI_API_KEY="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"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response =  openai.createCompletion({
  model: "text-davinci-003",
  prompt: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
  temperature: 0.9,
  max_tokens: 150,
  top_p: 1,
  frequency_penalty: 0.0,
  presence_penalty: 0.6,
  stop: [" Human:", " AI:"],
});