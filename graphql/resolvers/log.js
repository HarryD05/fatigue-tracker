const Log = require('../../models/LogModel');
const Day = require('../../models/DayModel');
const { transformLog, transformLogs, singleDay, singleLog } = require('./merge');

module.exports = {
  logs: async (args, req) => {
    try {
      const result = await Log.find();

      return transformLogs(result);
    } catch (err) {
      throw err;
    }
  },
  log: async (args, req) => {
    const { logId } = args;

    try {
      const result = await Log.findById(logId);

      return singleLog(results);
    } catch (err) {
      throw err;
    }
  },
  initLog: async (args, req) => {
    const { category, startTime } = args.initInput;

    let logDetails = {
      category,
      startTime,
      endTime: null,
      initPhysTiredness: null,
      initMentTiredness: null,
      endPhysTiredness: null,
      endMentTiredness: null,
    };

    try {
      const days = await Day.find();
      const today = await Day.findById(days[days.length - 1]._id);
      const logs = await transformLogs(today.logs);

      if (today) {
        if (logs.length === 0) {
          logDetails.initMentTiredness = todayDetails.initMentTiredness;
          logDetails.initPhysTiredness = todayDetails.initPhysTiredness;
        }
        newLog = new Log(logDetails);

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
        const pastLog = logs[logs.length - 2];
        const lastLog = logs[logs.length - 1];

        pastLog.endPhysTiredness = physTiredness;
        pastLog.endMentTiredness = mentTiredness;
        pastLog.endTime = endTime;
        await pastLog.save();

        lastLog.initPhysTiredness = physTiredness;
        lastLog.initMentTiredness = mentTiredness;
        lastLog.startTime = endTime;
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
      const days = await Day.find();

      if (logs.length > 0) {
        const lastLog = logs[logs.length - 1];
        const today = await Day.findById(days[days.length - 1]);

        lastLog.endPhysTiredness = physTiredness;
        lastLog.endMentTiredness = mentTiredness;
        lastLog.endTime = endTime;
        await lastLog.save();

        today.endPhysTiredness = physTiredness;
        today.endMentTiredness = mentTiredness;
        await today.save();


        return transformLog(lastLog);
      }

      return null;
    } catch (err) {
      throw err;
    }
  },
};
