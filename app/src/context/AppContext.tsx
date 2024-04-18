import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { API_URL } from '../constants/api';

// Define the shape of your context data
interface AppContextType {
  coachId: number | null;
  studentId: number | null;
  setCoachId: (id: number) => void;
  setStudentId: (id: number) => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [coachId, setCoachId] = useState<number | null>(1);
  const [studentId, setStudentId] = useState<number | null>(1);

  useEffect(() => {
    const fetchCoachesAndStudents = async () => {
      const result = await fetch(`${API_URL}/all-coaches`);
      const allCoaches = await result.json();
      setCoachId(allCoaches[0].id);

      const studentResult = await fetch(`${API_URL}/all-students`);
      const allStudents = await studentResult.json();
      setStudentId(allStudents[0].id);
    };

    fetchCoachesAndStudents();
  }, [])

  const contextValue: AppContextType = {
    coachId,
    studentId,
    setCoachId,
    setStudentId,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
