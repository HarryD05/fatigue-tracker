const Day = require("../../models/DayModel");
const { transformDay, transformLog } = require('./merge');

module.exports = {
  days: async (args, req) => {
    try {
      const result = await Day.find();

      return result.map(day => {
        return transformDay(day);
      });
    } catch (err) {
      throw err;
    }
  },
  initDay: async (args, req) => {
    const {
      startTime,
      initPhysTiredness,
      initMentTiredness,
    } = args.initDayInput;

    const dayDetails = {
      date: new Date(),
      startTime: new Date(startTime),
      endTime: null,
      initPhysTiredness,
      initMentTiredness,
      avgPhysTiredness: null,
      avgMentTiredness: null,
      logs: [],
    };

    try {
      const newDay = new Day(dayDetails);

      const result = await newDay.save();

      return transformDay(result);
    } catch (err) {
      throw err;
    }
  },
  setBedTime: async (args, req) => {
    const { time } = args;

    try {
      const days = await Day.find();

      const today = days[days.length - 1];

      today.endTime = time;

      if (today.logs && today.logs.length > 0) {
        console.log('Set averages for tiredness');
      }

      await today.save();

      return transformDay(today);
    } catch (err) {
      throw err;
    }
  },
};
