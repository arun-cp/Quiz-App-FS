'use client'

import { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [Exam , setExam] = useState([]);
  const [login , setlogin] = useState(false);

  return (
    <DashboardContext.Provider value={{ Exam , setExam , login , setlogin }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;


