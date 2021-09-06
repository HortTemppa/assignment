import React, { useState } from "react";

import HolidayInput from "./HolidayInput";
import Response from "./Response";

const HolidayApp = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <HolidayInput />
      <Response />
    </>
  );
};

export default HolidayApp;
