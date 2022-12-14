import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.animal),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}


export function generatePrompt(animal) {
  const lowercaseAnimal = animal.toLowerCase();
  return `Given a landscape description, suggest two unique picture captions.

Landscape Description: River flowing from mountains
Captions: Picturesque river gliding down from mountain lakes, Sparkling mountain water in the shadow of its creator
Landscape Description: ${lowercaseAnimal}
Captions:`;
}

