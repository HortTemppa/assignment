import React, { createContext, useContext } from "react";
import dateService from '../services/dateService'

const serviceContext = createContext(undefined);

const export ServiceProvider = () => {

    

    return <serviceContext.Provider>{children}</serviceContext.Provider>
}

export function useDateService = () => {

}