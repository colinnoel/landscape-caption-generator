import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { animal, temperature } = req.body;

  // Limit the length of the landscape description to 100 characters.
  const landscapeDescription = animal.substring(0, 100);

  // Generate the prompt for the language model using the limited landscape description.
  const prompt = generatePrompt(landscapeDescription);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature,
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

