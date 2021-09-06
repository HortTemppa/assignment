import { formatDistance, parseISO, compareDesc } from "date-fns";

import nationalHolidays from "./dates.json";

export default class holidayPlanner {
  constructor() {
    this.holidays = nationalHolidays;
  }

  countHolidays(startDate, endDate) {
    if (!compareDesc(startDate, endDate)) {
      throw new Error("The holiday end date cannot be before the start date.");
    }

    return formatDistance(parseISO(startDate), parseISO(endDate));
  }
}
