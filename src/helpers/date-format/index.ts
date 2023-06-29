import { DateTime } from 'luxon';

function getDateonlyYear(date: Date | string | number) {
  if (!date) {
    return ``;
  }
  const dateToChange = new Date(date);
  const year = dateToChange.getFullYear();
  const newDate = `${year}`;
  return newDate;
}

function convertToLocalFormat(date: Date | string | number) {
  if (!date) {
    return ``;
  }
  const newDate = DateTime.fromISO(date.toString(), { zone: 'system' });
  return newDate.toLocaleString(DateTime.DATE_MED);
}

function convertToLocalDate(date: Date | string | number) {
  if (!date) {
    return undefined;
  }
  return DateTime.fromISO(date.toString(), { zone: 'system' });
}

export { convertToLocalFormat, getDateonlyYear, convertToLocalDate};
