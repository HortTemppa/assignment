import {
  parseISO,
  isBefore,
  getYear,
  format,
  getOverlappingDaysInIntervals,
  eachDayOfInterval,
  isSunday,
  differenceInDays,
} from "date-fns";

import nationalHolidays from "./dates.json";

export function returnNextEndOfHolidayPeriod(startDate) {
  const dateToCompare = new Date(`${getYear(parseISO(startDate))}-03-31`);

  if (isBefore(parseISO(startDate), parseISO(dateToCompare))) {
    return dateToCompare;
  } else {
    return new Date(`${getYear(parseISO(startDate)) + 1}-03-31`);
  }
}

export function lengthIsValid(startDate, endDate) {
  const length = differenceInDays(parseISO(endDate), parseISO(startDate)) + 1;

  if (length > 50) {
    return false;
  } else {
    return true;
  }
}

export function isWithinHolidayPeriod(startDate, endDate) {
  const overLappingDays = getOverlappingDaysInIntervals(
    {
      start: parseISO(startDate),
      end: returnNextEndOfHolidayPeriod(startDate),
    },
    {
      start: parseISO(startDate),
      end: parseISO(endDate),
    }
  );

  const intervalDays = differenceInDays(parseISO(endDate), parseISO(startDate));

  if (overLappingDays !== intervalDays) {
    return false;
  } else {
    return true;
  }
}

export function isStartBeforeEnd(startDate, endDate) {
  if (startDate === endDate) {
    return true;
  }
  return isBefore(parseISO(startDate), parseISO(endDate));
}

export function countSundaysAndNationalHolidays(startDate, endDate) {
  let daysToSubtract = 0;

  const daysInInterval = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  });

  daysInInterval.map((intervalDay) => {
    nationalHolidays.Finland.map((nationalHoliday) => {
      if (nationalHoliday === format(intervalDay, "yyyy-MM-dd")) {
        return daysToSubtract++;
      } else {
        return null;
      }
    });

    if (isSunday(intervalDay)) {
      return daysToSubtract++;
    } else {
      return null;
    }
  });

  return daysToSubtract;
}
