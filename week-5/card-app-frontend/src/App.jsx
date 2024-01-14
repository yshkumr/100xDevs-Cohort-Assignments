import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import BusinessCard from "./components/BusinessCard";

function App() {
  const [cards, setCards] = useState([]);

  const BASE_URL = "http://localhost:3000";

  const fetchCards = async () => {
    const resp = await axios.get(`${BASE_URL}/cards`);
    setCards(resp.data.cards);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <>
      <h1>Business Cards</h1>

      <div className="cards">
        {cards.map((card) => (
          <BusinessCard key={card._id} details={card} />
        ))}
      </div>
    </>
  );
}

export default App;
