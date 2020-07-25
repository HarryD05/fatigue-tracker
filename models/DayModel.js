const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DaySchema = new Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
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
    required: true,
  },
  avgMentTiredness: {
    type: Number,
    required: true,
  },
  logs: {
    type: [Schema.Types.ObjectId],
    ref: "Log",
  },
});

module.exports = mongoose.model("Day", DaySchema);
