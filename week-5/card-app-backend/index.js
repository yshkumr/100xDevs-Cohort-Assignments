const express = require("express");
const cors = require("cors");
const app = express();

const Card = require("./db/config");
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/cards", async (req, res) => {
  const cards = await Card.find();

  res.status(200).json({
    cards: cards,
  });
});

app.post("/createCard", (req, res) => {
  const { name, description, interests, socials } = req.body;

  if (!name || !description || !interests || !socials) {
    return res.status(400).json({
      msg: "Invalid Input",
    });
  }

  if (
    !Array.isArray(interests) ||
    !socials.every(
      (social) =>
        typeof social === "object" && "name" in social && "link" in social
    )
  ) {
    return res.status(400).json({
      msg: "Invalid Input",
    });
  }
  Card.create({ name, description, interests, socials });

  res.status(200).json({
    msg: "Card Successfully Created",
  });
});

app.listen(PORT, () => {
  console.log(`Running at Port ${PORT}`);
});
