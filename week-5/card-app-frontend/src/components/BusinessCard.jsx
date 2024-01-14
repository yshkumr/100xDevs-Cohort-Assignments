import React from "react";
import "./BusinessCard.css";

const BusinessCard = ({ details }) => {
  const { name, description, interests, socials } = details;

  return (
    <div className="card">
      <div className="info">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>

      <div className="interests">
        <h3>Interests</h3>

        {interests.map((interest, index) => (
          <p key={index}>{interest}</p>
        ))}
      </div>

      <div className="socials">
        {socials.map((social) => (
          <a key={social._id} href={social.link}>
            {social.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default BusinessCard;
