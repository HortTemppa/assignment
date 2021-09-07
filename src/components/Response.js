import React from "react";

const Response = ({ error, message }) => {
  return message ? (
    error ? (
      <>
        <div>
          <p style={{ color: "red" }}>{message}</p>
        </div>
      </>
    ) : (
      <div>
        <p>{message}</p>
      </div>
    )
  ) : null;
};

export default Response;
