const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  category: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  physTiredness: {
    type: Number,
    required: true,
  },
  mentTiredness: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Log", LogSchema);
