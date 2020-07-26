const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  category: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date
  },
  notes: {
    type: String,
  },
  physTiredness: {
    type: Number
  },
  mentTiredness: {
    type: Number
  },
});

module.exports = mongoose.model("Log", LogSchema);
