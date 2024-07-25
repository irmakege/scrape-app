// pages/api/labelText.js

import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export async function POST(req, res) {

  const { text } = req.body;

  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Label the following text as positive or negative:" },
      { role: "user", content: `${text}` },
    ],
    max_tokens: 10,
    temperature: 0.5,
  });

  console.log(response.choices[0].message.content)
  const label = response.choices[0].message.content;
  
  return Response.json({label: label})
}

