export default class dateService {
  constructor() {
    let holidays = [];
    this.setHolidays();
  }

  setHolidays() {
    fetch("./dates.json").then((response) => (this.holidays = response.data));
  }
}
