import {
  parseISO,
  isBefore,
  getYear,
  format,
  getOverlappingDaysInIntervals,
  eachDayOfInterval,
  isSunday,
  differenceInCalendarDays,
} from "date-fns";

import nationalHolidays from "./dates.json";

function returnNextEndOfHolidayPeriod(startDate) {
  const dateToCompare = new Date(getYear(parseISO(startDate)), 2, 31);

  if (
    isBefore(parseISO(startDate), parseISO(format(dateToCompare, "yyyy-MM-dd")))
  ) {
    return dateToCompare;
  } else {
    return new Date(getYear(parseISO(startDate)) + 1, 2, 31);
  }
}

function isWithinHolidayPeriod(startDate, endDate) {
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

function isStartBeforeEnd(startDate, endDate) {
  return isBefore(parseISO(startDate), parseISO(endDate));
}

function countSundaysAndNationalHolidays(startDate, endDate) {
  let daysToSubtract = 0;

  const daysInInterval = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  });

  daysInInterval.map((day) => {
    nationalHolidays.Finland.map((nationalHoliday) => {
      if (nationalHoliday === format(day, "yyyy-MM-dd")) {
        return daysToSubtract++;
      } else {
        return null;
      }
    });

    if (isSunday(day)) {
      return daysToSubtract++;
    } else {
      return null;
    }
  });

  return daysToSubtract;
}

export default class holidayPlanner {
  countHolidays(startDate, endDate) {
    //check if the startDate is before endDate and return an error if it is not

    if (!isStartBeforeEnd(startDate, endDate)) {
      throw new Error("The end date can't be before the start date");
    }

    //check if the holiday is within the same holiday period

    if (!isWithinHolidayPeriod(startDate, endDate)) {
      throw new Error("The dates are not within the same holiday period");
    }

    //count the Sundays and national holidays and subtract them from the total amount of days in the time span

    const daysToSubtract = countSundaysAndNationalHolidays(startDate, endDate);

    return (
      differenceInCalendarDays(parseISO(endDate), parseISO(startDate)) -
      daysToSubtract
    );
  }
}
