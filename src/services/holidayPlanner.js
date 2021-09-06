export default class holidayPlanner {
  constructor() {
    this.holidays = [];
    this.setHolidays();
  }

  setHolidays() {
    fetch("./dates.json").then((response) => (this.holidays = response.data));
  }
}
