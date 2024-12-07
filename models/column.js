const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tabId: { type: String },
});

const Column = mongoose.model("Column", columnSchema);

module.exports = Column;
