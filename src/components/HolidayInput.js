import React, { useState } from "react";
import { useHolidayPlanner } from "./ServiceContext";

const HolidayInput = ({ setError, setMessage }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const holidayPlanner = useHolidayPlanner();

  function handleSubmit(e) {
    e.preventDefault();

    try {
      const holidays = holidayPlanner.countHolidays(startDate, endDate);

      setMessage(
        `This interval will consume ${holidays} days of your available vacation days.`
      );
    } catch (error) {
      setError(true);
      setMessage(error.message);
      console.error(error);

      setTimeout(() => {
        setError(false);
        setMessage(undefined);
      }, 3000);
    }
  }

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
