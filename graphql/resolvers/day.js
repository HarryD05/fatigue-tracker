const Day = require("../../models/DayModel");

module.exports = {
  days: async (args, req) => {
    try {
      const result = await Day.find();

      return result;
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

      return {
        ...result,
        date: new Date(result.date).toISOString(),
        startTime: new Date(result.startTime).toISOString(),
      };
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

      await today.save();

      return today;
    } catch (err) {
      throw err;
    }
  },
};
