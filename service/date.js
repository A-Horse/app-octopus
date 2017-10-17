import { getDay, getDate, getMonth as getMonthFns } from 'date-fns';

const WeekDayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MonthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const getWeekDayName = () => {
  return WeekDayName[getDay()];
};

export const getMonthDay = () => {
  return getDate();
};

export const getMonth = () => {
  return getMonthFns() + 1;
};
