import {
  formatDistance,
  parseISO,
  isBefore,
  areIntervalsOverlapping,
} from "date-fns";

import nationalHolidays from "./dates.json";

class checkInterval {

  checkInterval(endDate, startDate){
    areIntervalsOverlapping(
      {
        start: parseISO(startDate),
        end: parseISO(endDate),
      },
      {
        start: parseISO(startDate),
        end: () => {
          parseISO(startDate)
        },
      })
    }
}

class checkStartAndEnd{
  checkStartAndEnd(){
    if (isBefore(parseISO(startDate), parseISO(endDate))) {
      throw new Error("The holiday end date cannot be before the start date.");
    }
  }
}

export default class holidayPlanner {
  constructor() {
    this.holidays = nationalHolidays;
  }

  countHolidays(startDate, endDate) {
    //check if the endDate is before startDate and return an error if it is so

   checkStartAndEnd.checkStartAndEnd();

    //check if the holiday is within the same holiday period

    checkInterval.checkInterval(endDate, startDate)
    
    )
      return formatDistance(parseISO(startDate), parseISO(endDate));
  }
}
