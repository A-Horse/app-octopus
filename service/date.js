import moment from 'moment';

const WeekDayName = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];

const MonthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getWeekDayName = () => {
  return WeekDayName[moment().day()];
};

export const getMonthDay = () => {
  return moment().get('date');
};

export const getMonth = () => {
  return moment().get('month') + 1;
};
