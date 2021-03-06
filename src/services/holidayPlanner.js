import { parseISO, differenceInCalendarDays } from "date-fns";

import {
  isWithinHolidayPeriod,
  isStartBeforeEnd,
  countSundaysAndNationalHolidays,
  lengthIsValid,
} from "../utilities/dateUtilityFunctions.js";

export default class holidayPlanner {
  countHolidays(startDate, endDate) {
    //check that the length of the time span is not over 50 days

    if (!lengthIsValid(startDate, endDate)) {
      throw new Error("The selected holiday can't be over 50 days.");
    }

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
      differenceInCalendarDays(parseISO(endDate), parseISO(startDate)) +
      1 -
      daysToSubtract
    );
  }
}
