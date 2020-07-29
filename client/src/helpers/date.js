const indexToMonth = index => {
  return {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  }[index]
}

const formatDate = date => {
  return `${date.getDate()} ${indexToMonth(date.getMonth())} ${date.getFullYear()}`;
}

const formatTime = date => {
  return `${ensureTwoDigits(date.getHours())}:${ensureTwoDigits(date.getMinutes())}`;
}

const ensureTwoDigits = num => {
  return num.toString().length === 2 ? num : '0' + num;
}

exports.formatDate = formatDate;
exports.formatTime = formatTime