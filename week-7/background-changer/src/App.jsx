import { useState } from "react";
import "./App.css";

function App() {
  const [backgroundColor, setBackgroundColor] = useState("");

  const changeBgColor = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className="main" style={{ backgroundColor }}>
      <div className="btns">
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => changeBgColor("red")}
        >
          Red
        </button>
        <button
          style={{ backgroundColor: "yellow" }}
          onClick={() => changeBgColor("yellow")}
        >
          Yellow
        </button>
        <button
          style={{ backgroundColor: "black", color: "white" }}
          onClick={() => changeBgColor("black")}
        >
          Black
        </button>
        <button
          style={{ backgroundColor: "purple" }}
          onClick={() => changeBgColor("purple")}
        >
          Purple
        </button>
        <button
          style={{ backgroundColor: "green" }}
          onClick={() => changeBgColor("green")}
        >
          Green
        </button>
        <button
          style={{ backgroundColor: "blue" }}
          onClick={() => changeBgColor("blue")}
        >
          Blue
        </button>
        <button
          style={{ backgroundColor: "#ec5700" }}
          onClick={() => changeBgColor("#ec5700")}
        >
          Default
        </button>
      </div>
    </div>
  );
}

export default App;
