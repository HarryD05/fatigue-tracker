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
  initPhysTiredness: {
    type: Number,
    required: true,
  },
  initMentTiredness: {
    type: Number,
    required: true,
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
