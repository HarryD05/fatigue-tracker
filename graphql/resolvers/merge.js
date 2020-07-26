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

    return logs.map(log => {
      return singleLog(log);
    });
  } catch (err) {
    throw err;
  }
}

const transformDay = async day => {
  return {
    ...day._doc,
    date: transformDate(day._doc.date),
    startTime: transformDate(day._doc.startTime),
    endTime: transformDate(day._doc.endTime),
    logs: transformLogs.bind(this, day._doc.logs)
  }
}

const transformDays = async dayIDs => {
  try {
    const days = await Day.find({ _id: { $in: dayIDs } });

    return days.map(day => {
      return transformDay(day);
    });
  } catch (err) {
    throw err;
  }
}

exports.transformDay = transformDay;
exports.transformLog = transformLog;
exports.transformDays = transformDays;
exports.transformLogs = transformLogs;