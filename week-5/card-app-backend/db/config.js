const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:wow786wow@cluster0.ribqhkj.mongodb.net/cards"
);

const CardSchema = new mongoose.Schema({
  name: String,
  description: String,

  interests: [String],

  socials: [
    {
      name: String,
      link: String,
    },
  ],
});

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
