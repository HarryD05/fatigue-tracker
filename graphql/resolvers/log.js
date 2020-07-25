const Log = require("../../models/LogModel");

module.exports = {
  logs: async (args, req) => {
    try {
      const result = await Log.find();

      return {
        ...result.doc,
      };
    } catch (err) {
      throw err;
    }
  },
  initLog: async (args, req) => {
    const { category } = args;

    const logDetails = {
      category,
      notes: null,
      physTiredness: null,
      mentTiredness: null,
    };

    try {
      const newLog = new Log(logDetails);
      await newLog.save();

      return newLog;
    } catch (err) {
      throw err;
    }
  },
  updateLog: async (args, req) => {
    const { notes, physTiredness, mentTiredness } = args;

    try {
      const logs = await Log.find();

      if (logs.length > 1) {
        const lastLog = logs[logs.length - 2];

        lastLog.notes = notes;
        lastLog.physTiredness = physTiredness;
        lastLog.mentTiredness = mentTiredness;

        await lastLog.save();

        return lastLog;
      }

      return null;
    } catch (err) {
      throw err;
    }
  },
};
