import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { animal, temperature } = req.body;

  if (req.body.animal) { // Check if req.body.animal exists
    // Limit the length of the landscape description to 1000 characters.
    landscapeDescription = animal.substring(0, 1000);

    // Generate the prompt for the language model using the limited landscape description.
    const prompt = generatePrompt(landscapeDescription);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } else {
    res.status(400).json({ error: "Please provide a landscape description." });
  }
}


export function generatePrompt(animal) {
  const lowercaseAnimal = animal.toLowerCase();
  return `Given a landscape description, suggest two unique picture captions.

Landscape Description: River flowing from mountains
Captions: Picturesque river gliding down from mountain lakes, Sparkling mountain water in the shadow of its creator
Landscape Description: ${lowercaseAnimal}
Captions:`;
}

