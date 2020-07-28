const Log = require('../../models/LogModel');
const Day = require('../../models/DayModel');
const { transformLog, transformLogs } = require('./merge');

module.exports = {
  logs: async (args, req) => {
    try {
      const result = await Log.find();

      return transformLogs(result);
    } catch (err) {
      throw err;
    }
  },
  initLog: async (args, req) => {
    const { category, startTime } = args.initInput;

    const logDetails = {
      category,
      startTime,
      endTime: null,
      physTiredness: null,
      mentTiredness: null,
    };

    try {
      const newLog = new Log(logDetails);

      const days = await Day.find();
      const today = days[days.length - 1];
      if (today) {
        today.logs.push(newLog._id);
        await today.save();
      }

      await newLog.save();

      return transformLog(newLog);
    } catch (err) {
      throw err;
    }
  },
  updateLog: async (args, req) => {
    const { physTiredness, mentTiredness, endTime } = args.updateInput;

    try {
      const logs = await Log.find();

      if (logs.length > 1) {
        const lastLog = logs[logs.length - 2];

        lastLog.physTiredness = physTiredness;
        lastLog.mentTiredness = mentTiredness;
        lastLog.endTime = endTime;

        await lastLog.save();

        return transformLog(lastLog);
      }

      return null;
    } catch (err) {
      throw err;
    }
  },
  completeLogs: async (args, req) => {
    const { physTiredness, mentTiredness, endTime } = args.updateInput;

    try {
      const logs = await Log.find();

      if (logs.length > 0) {
        const lastLog = logs[logs.length - 1];

        lastLog.physTiredness = physTiredness;
        lastLog.mentTiredness = mentTiredness;
        lastLog.endTime = endTime;

        await lastLog.save();

        return transformLog(lastLog);
      }

      return null;
    } catch (err) {
      throw err;
    }
  },
};
