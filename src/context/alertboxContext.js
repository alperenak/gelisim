import React, { createContext, useState } from "react";

export const AlertboxContext = createContext();
export default function AlertboxContextProvider(props) {
  const [alertboxData, setAlertBoxData] = useState([]);
  return (
    <AlertboxContext.Provider value={[alertboxData, setAlertBoxData]}>
      {props.children}
    </AlertboxContext.Provider>
  );
}
