import React, { createContext, useContext, useMemo } from "react";
import dateService from "../services/dateService";

const serviceContext = createContext(undefined);

export const DateProvider = ({ children }) => {
  const service = useMemo(() => new dateService(), []);

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
