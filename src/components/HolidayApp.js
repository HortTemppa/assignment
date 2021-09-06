import React, { useState } from "react";

import HolidayInput from "./HolidayInput";
import Response from "./Response";

const HolidayApp = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <HolidayInput setError={setError} setMessage={setMessage} />
      <Response error={error} message={message} />
    </>
  );
};

export default HolidayApp;
