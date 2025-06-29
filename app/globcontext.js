'use client'

import { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [Exam , setExam] = useState([]);

  return (
    <DashboardContext.Provider value={{ Exam , setExam }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;


