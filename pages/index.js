import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
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
      body: JSON.stringify({ prompt }),
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
          <input type="submit" value="Generate captions" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
