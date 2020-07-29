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
  initPhysTiredness: {
    type: Number
  },
  initMentTiredness: {
    type: Number
  },
  endPhysTiredness: {
    type: Number
  },
  endMentTiredness: {
    type: Number
  },
});

module.exports = mongoose.model("Log", LogSchema);
