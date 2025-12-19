import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface StudentData {
  name: string;
  id: string;
  email: string;
  courses: any[];
  recommendations: any[];
  encouragement: string;
  performanceLevel: any;
  weakTopics: any[];
  streak?: number;
  quizzes?: any;
  assignments?: any;
  badges?: any[];
}

interface StudentDataContextType {
  data: StudentData | null;
  loading: boolean;
  setUserId: (id: string) => void;
}

const StudentDataContext = createContext<StudentDataContextType>({
  data: null,
  loading: true,
  setUserId: () => {},
});

export const StudentDataProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [data, setData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(user?.id || "");

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/student/${userId}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch student failed:", err);
        setLoading(false);
      });
  }, [userId]);

  return (
    <StudentDataContext.Provider value={{ data, loading, setUserId }}>
      {children}
    </StudentDataContext.Provider>
  );
};

export const useStudentData = () => useContext(StudentDataContext);
