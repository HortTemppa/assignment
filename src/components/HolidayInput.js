import React, { useState } from "react";
import { useHolidayPlanner } from "./ServiceContext";

const HolidayInput = ({ setError, setMessage }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [holidays, setHolidays] = useState();

  const holidayPlanner = useHolidayPlanner();

  function handleSubmit(e) {
    e.preventDefault();

    try {
      setHolidays(holidayPlanner.countHolidays(endDate, startDate));
    } catch (error) {
      setError(true);
      setMessage(error.message);
      console.log(error.message);

      setTimeout(() => {
        setError(false);
        setMessage(undefined);
      }, 3000);
    }
  }

  console.log("Holidays:", holidays);

  return (
    <div>
      <h1>Holiday Planner</h1>
      <form onSubmit={handleSubmit}>
        <p>
          Start Date:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
        </p>
        <p>
          End Date:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></input>
        </p>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default HolidayInput;
