import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import temperatureStyles from "./index.module.css"; // Import the temperature styles

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [temperature, setTemperature] = useState(0.6); // Default temperature value
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    // Limit the length of the landscape description to 100 characters.
    const landscapeDescription = animalInput.substring(0, 100);

    // Generate the prompt for the language model using the limited landscape description.
    const prompt = generatePrompt(landscapeDescription);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        temperature, // Include the temperature in the request body
      }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>Landscape Caption Generator</title>
        <link rel="icon" href="/mountain.png" />
      </Head>

      <main className={styles.main}>
        <img src="/mountain.png" className={styles.icon} />
        <h3>Landscape Caption Generator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Describe your landscape"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <br />
          <input type="number" min="0" max="1" step="0.1" value={temperature} onChange={(e) => setTemperature(e.target.value)} 
          className={temperatureStyles.temperatureInput} />
          <br />
          <input type="submit" value="Generate captions" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
