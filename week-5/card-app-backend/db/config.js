const mongoose = require("mongoose");

mongoose.connect("MONGODB_URL");

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
