import React, { createContext, useContext, useMemo } from "react";
import holidayPlanner from "../services/holidayPlanner";

const serviceContext = createContext(undefined);

export const DateProvider = ({ children }) => {
  const service = useMemo(() => new holidayPlanner(), []);

  return (
    <serviceContext.Provider value={service}>
      {children}
    </serviceContext.Provider>
  );
};

export function useDateService() {
  const service = useContext(serviceContext);

  if (service === undefined) {
    throw new Error("useDateService called outside of provider");
  }
  return service;
}
