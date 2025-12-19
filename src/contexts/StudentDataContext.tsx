import { createContext, useContext, useState, ReactNode } from "react";

interface StudentData {
  name: string;
  email: string;
  courses: any[];
  recommendations: any[];
  encouragement: string;
  performanceLevel: number;
  streak: number;
  quizzes: { completed: number; pending: number };
  assignments: { submitted: number; pending: number; missed: number };
  badges: any[];
}

interface StudentDataContextType {
  data: StudentData | null;
  loading: boolean;
}

// Mock data for UI-only version
const mockStudentData: StudentData = {
  name: "",
  email: "",
  courses: [],
  recommendations: [],
  encouragement: "Every step you take brings you closer to your goals. Keep learning!",
  performanceLevel: 0,
  streak: 0,
  quizzes: { completed: 0, pending: 0 },
  assignments: { submitted: 0, pending: 0, missed: 0 },
  badges: [],
};

const StudentDataContext = createContext<StudentDataContextType>({
  data: null,
  loading: false,
});

export const StudentDataProvider = ({ children }: { children: ReactNode }) => {
  const [data] = useState<StudentData | null>(mockStudentData);
  const [loading] = useState(false);

  return (
    <StudentDataContext.Provider value={{ data, loading }}>
      {children}
    </StudentDataContext.Provider>
  );
};

export const useStudentData = () => useContext(StudentDataContext);
