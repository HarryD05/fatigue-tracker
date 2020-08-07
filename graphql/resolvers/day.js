const Day = require('../../models/DayModel');
const Log = require('../../models/LogModel');

const { transformDay, transformLogs, singleDay } = require('./merge');

module.exports = {
  days: async (args, req) => {
    try {
      const result = await Day.find();

      return result.map(day => {
        return transformDay(day, true);
      });
    } catch (err) {
      throw err;
    }
  },
  day: async (args, req) => {
    const { dayId } = args;

    try {
      const result = await Day.findById(dayId);

      return singleDay(result, true);
    } catch (err) {
      throw err;
    }
  },
  today: async (args, req) => {
    try {
      const result = await Day.find();

      if (result.length > 0) {
        return transformDay(result[result.length - 1]);
      }

      return null;
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

    let dayDetails = {
      date: new Date(),
      startTime: new Date(startTime),
      endTime: null,
      initPhysTiredness,
      initMentTiredness,
      endPhysTiredness: null,
      endMentTiredness: null,
      avgPhysTiredness: null,
      avgMentTiredness: null,
      logs: [],
    };

    let logDetails = {
      category: 1,
      startTime: new Date(startTime),
      endTime: null,
      initPhysTiredness,
      initMentTiredness,
      endPhysTiredness: null,
      endMentTiredness: null,
    }

    try {
      const newLog = new Log(logDetails);
      const logResult = await newLog.save();

      dayDetails.logs.push(logResult._id);
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
      await today.save();

      return transformDay(today);
    } catch (err) {
      throw err;
    }
  },
  calculateAverages: async (args, req) => {
    const { date } = args;

    try {
      const days = await Day.find();
      let target;
      days.forEach(day => {
        if (new Date(day.date).toDateString() === new Date(date).toDateString()) {
          target = day;
        }
      })

      if (target) {
        const logs = await transformLogs(target.logs);
        let mentTotal = target.initMentTiredness;
        let physTotal = target.initPhysTiredness;
        let count = 0;
        logs.forEach(log => {
          count++;
          mentTotal += log.endMentTiredness;
          physTotal += log.endPhysTiredness;
        })

        const avgMent = Number((mentTotal / count).toFixed(2));
        const avgPhys = Number((physTotal / count).toFixed(2));

        target.avgMentTiredness = avgMent;
        target.avgPhysTiredness = avgPhys;

        await target.save();

        return target;
      }

      return null;
    } catch (err) {
      throw err;
    }
  }
};
