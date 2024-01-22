import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./GithubCard.css";

const GithubCard = ({ username }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }, [username]);

  const {
    login,
    name,
    location,
    html_url,
    avatar_url,
    public_repos,
    followers,
  } = userData;

  return (
    <div className="card">
      <div className="profile-pic">
        <img src={avatar_url} alt="" />
      </div>
      <div className="content">
        <p className="name">{name}</p>
        <p>@{login}</p>
        <p>{location}</p>
        <p>Repos : {public_repos}</p>
        <p>Followers : {followers}</p>
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          View Profile
        </a>
      </div>
    </div>
  );
};

export default GithubCard;
