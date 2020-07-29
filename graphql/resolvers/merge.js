const Log = require('../../models/LogModel');
const Day = require('../../models/DayModel');

const transformDate = date => {
  return (date !== null) ? new Date(date).toISOString() : null;
}

const transformLog = async log => {
  return {
    ...log._doc,
    startTime: transformDate(log._doc.startTime),
    endTime: transformDate(log._doc.endTime)
  }
}

const singleLog = async logID => {
  try {
    const log = await Log.findById(logID);

    return transformLog(log);
  } catch (err) {
    throw err;
  }
}

const transformLogs = async logIDs => {
  try {
    const logs = await Log.find({ _id: { $in: logIDs } });

    const result = await Promise.all(logs.map(async log => {
      const logResult = await singleLog(log);
      return logResult;
    }));

    return result;
  } catch (err) {
    throw err;
  }
}

const transformDay = async (day, expandLogs) => {
  return {
    ...day._doc,
    date: transformDate(day._doc.date),
    startTime: transformDate(day._doc.startTime),
    endTime: transformDate(day._doc.endTime),
    logs: expandLogs ? transformLogs.bind(this, day._doc.logs) : day._doc.logs
  }
}

const singleDay = async (dayID, expandLogs) => {
  try {
    const day = await Day.findById(dayID);

    return transformDay(day, expandLogs);
  } catch (err) {
    throw err;
  }
}

const transformDays = async dayIDs => {
  try {
    const days = await Day.find({ _id: { $in: dayIDs } });

    return Promise.all(days.map(async day => {
      return await singleDay(day, true);
    }));
  } catch (err) {
    throw err;
  }
}

exports.singleDay = singleDay;
exports.singleLog = singleLog;
exports.transformDay = transformDay;
exports.transformLog = transformLog;
exports.transformDays = transformDays;
exports.transformLogs = transformLogs;