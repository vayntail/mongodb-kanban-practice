const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  columnId: { type: String },
  tabId: { type: String },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
