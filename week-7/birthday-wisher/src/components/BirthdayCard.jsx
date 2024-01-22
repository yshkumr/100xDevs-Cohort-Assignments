import React from "react";
import "./BirthdayCard.css";

const BirthdayCard = ({ bdayName, message }) => {
  return (
    <div className="bday-card">
      <h3>
        Happy Birthday, {bdayName.charAt(0).toUpperCase() + bdayName.slice(1)}!
      </h3>
      <p>{message}</p>
    </div>
  );
};

export default BirthdayCard;
