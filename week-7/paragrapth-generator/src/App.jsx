import { useState } from "react";
import "./App.css";

function App() {
  const [target, setTarget] = useState(0);
  const [paragraph, setParagraph] = useState("");

  const words = [
    "Lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "Sed",
    "do",
    "eiusmod",
    "tempor",
    "incididun",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
  ];

  function generateParagraph() {
    let totalString = "";
    for (let i = 0; i <= parseInt(target); i++) {
      totalString =
        totalString + " " + words[Math.round(Math.random() * words.length)];
    }
    setParagraph(totalString);
  }

  return (
    <div className="main">
      <h1>Paragraph Generator</h1>
      <div className="content">
        <input
          type="number"
          placeholder="Enter number of words"
          name=""
          id=""
          value={target}
          onChange={(e) => {
            setTarget(e.target.value);
          }}
        />
        <button onClick={generateParagraph}>Generate</button>
      </div>
      <div className="text">{paragraph}</div>
    </div>
  );
}

export default App;
