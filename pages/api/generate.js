import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.animal),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(animal) {
  const lowercaseAnimal = animal.toLowerCase();
  return `Given a landscape description, suggest two unique picture captions that someone can use for a social media post.

Landscape Description: River flowing from mountains
Captions: Picturesque river gliding down from mountain lakes, Sparkling mountain water in the shadow of its creator
Landscape Description: ${lowercaseAnimal}
Captions:`;
}

