import {
  parseISO,
  isBefore,
  getYear,
  format,
  getOverlappingDaysInIntervals,
  eachDayOfInterval,
  isSunday,
} from "date-fns";

import nationalHolidays from "./dates.json";

export function returnNextEndOfHolidayPeriod(startDate) {
  const dateToCompare = new Date(getYear(parseISO(startDate)), 2, 31);

  if (
    isBefore(parseISO(startDate), parseISO(format(dateToCompare, "yyyy-MM-dd")))
  ) {
    return dateToCompare;
  } else {
    return new Date(getYear(parseISO(startDate)) + 1, 2, 31);
  }
}

export function isWithinHolidayPeriod(startDate, endDate) {
  const overLappingDays = getOverlappingDaysInIntervals(
    {
      start: parseISO(startDate),
      end: parseISO(endDate),
    },
    {
      start: parseISO(startDate),
      end: parseISO(
        format(returnNextEndOfHolidayPeriod(startDate), "yyyy-MM-dd")
      ),
    }
  );

  const intervalDays = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  });

  if (overLappingDays !== intervalDays.length - 1) {
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
