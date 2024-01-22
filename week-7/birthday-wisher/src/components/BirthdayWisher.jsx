import React from "react";
import "./BirthdayWisher.css";
import { useState } from "react";
import BirthdayCard from "./BirthdayCard";

const BirthdayWisher = () => {
  const [name, setName] = useState("");
  const [generate, setGenerate] = useState(false);

  const wish = [
    "May your birthday be as sweet and delightful as the cake!",

    "May every moment of your birthday be the happiest you've ever had.",

    "May your birthday be the start of a year filled with good luck, good health, and much happiness.",
  ];

  return (
    <div className="bday">
      <div className="bday-input">
        <h2>Generate Birthday Wish Cards</h2>
        <div className="bday-input-content">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            maxLength={30}
            name=""
            id=""
            placeholder="Enter your name"
          />
          <button
            onClick={() => {
              setGenerate(true);
            }}
          >
            Done
          </button>
        </div>
      </div>
      {generate && (
        <div className="bday-cards">
          <BirthdayCard bdayName={name} message={wish[0]} />
          <BirthdayCard bdayName={name} message={wish[1]} />
          <BirthdayCard bdayName={name} message={wish[2]} />
        </div>
      )}
    </div>
  );
};

export default BirthdayWisher;
