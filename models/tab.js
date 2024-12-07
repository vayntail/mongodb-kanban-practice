const mongoose = require("mongoose");

const tabSchema = new mongoose.Schema({
  name: { type: String, required: true },
  order: { type: Number },
});

tabSchema.index({ order: -1 }); // index for sorting by id

const Tab = mongoose.model("Tab", tabSchema);

module.exports = Tab;
