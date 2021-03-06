const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DaySchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
  sleepQuality: {
    type: Number,
    required: true
  },
  sleepCause: {
    type: Number,
    required: true
  },
  initPhysTiredness: {
    type: Number,
    required: true,
  },
  initMentTiredness: {
    type: Number,
    required: true,
  },
  endPhysTiredness: {
    type: Number
  },
  endMentTiredness: {
    type: Number
  },
  avgPhysTiredness: {
    type: Number,
  },
  avgMentTiredness: {
    type: Number,
  },
  logs: {
    type: [Schema.Types.ObjectId],
    ref: "Log",
  },
});

module.exports = mongoose.model("Day", DaySchema);
