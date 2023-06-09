

import * as dotenv from 'dotenv';
import express from 'express';

import cors from 'cors';

import { Configuration, OpenAIApi } from 'openai';
dotenv.config();
// console.log('daadadadaadadad',dotenv.config());
// console.log('zzz',process.env);

// console.log('2222seeeeeehereeee',process.env.OPENAI_API_KEY);

const configuration= new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai =new OpenAIApi(configuration);
const app=express();
app.use(cors());
app.use(express.json());

app.get('/',async (req,res)=>{
    res.status(200).send({
        message: 'Hello'
    })
});

app.post('/', async (req, res) => {
    try {
      

      //convo history
      //convo history
      const conversation = req.body.conversation || [];

      // Only keep the last 5 conversations
      const contextConversation = conversation.slice(-10);
      
      const prompts = contextConversation.filter(item => item.sender === 'user').map(item => item.prompt);
      const botResponses = contextConversation.filter(item => item.sender === 'bot').map(item => item.bot || '');
      if (prompts.length > botResponses.length) {
        botResponses.push('');
      }
      const context = prompts.map((prompt, i) => {
        if (botResponses[i]) {
          return `{Q: ${prompt} \n ${botResponses[i]}}`;
        } else {
          return `{Q: ${prompt}}`;
        }
      }).join('\n');
      
      
      
      console.log('\n\n**//**  This is the Context\n',context);
      


      
      const prompt = req.body.prompt;

      const promptful = `${context}\n{Q: ${prompt}}`;


      console.log('\n\n**//**  This is the prompt\n',req.body.prompt);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${promptful}`,
        temperature: 0,
        max_tokens: 3999,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });
      
      // console.log('\n\n**//**  This is the req\n',req);
      res.status(200).send({
        bot: response.data.choices[0].text,
      });
      
      console.log('\n\n**//**  This is the response.data.choices[0].text\n',response.data.choices[0].text);
      // console.log('\n\nRES======\n',res);
      console.log('\n\nPROMPT======\n',prompt);
      console.log('\n\n**//**  This is the response.data\n',response.data);
      
    } catch (error) {
      
      console.error(error);
      res.status(500).send({ error });
    }
  });
  
  app.listen(5000,()=> console.log('Server is running on port http://localhost:5000'));

 




