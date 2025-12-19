import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useStudentData } from "@/contexts/StudentDataContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  TrendingUp,
  Flame,
  BookOpen,
  Target,
  Award,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const { data: student, loading, setUserId } = useStudentData();

  useEffect(() => {
    if (user?.id) setUserId(user.id);
  }, [user]);

  if (loading) return <div className="p-6">Loading student data...</div>;
  if (!student) return <div className="p-6">No student data available</div>;

  const stats = {
    overallPerformance: student.performanceLevel?.score || 0,
    streak: student.streak || 0,
    activeCourses: student.courses.filter(c => c.status === "on-track").length,
    completedCourses: student.courses.filter(c => c.progress === 100).length,
    totalQuizzes: student.quizzes?.completed || 0,
    totalAssignments: student.assignments?.submitted || 0,
    hoursLearned: student.courses.reduce((sum, c) => sum + c.totalHours, 0),
    badgesEarned: student.badges?.length || 0,
  };

  const dailyGoals = student.recommendations?.slice(0, 3).map((rec, idx) => ({ id: idx, title: rec.title, completed: false })) || [];
  const motivationalQuote = student.encouragement || "";

  // --- rest of your dashboard JSX remains exactly the same ---
  return (
    <DashboardLayout>
      {/* ...Your dashboard content as in your last Dashboard.tsx */}
    </DashboardLayout>
  );
};

function StatsCard({ title, value, description, icon: Icon, iconColor }: any) {
  return (
    <Card className="shadow-soft hover:shadow-medium transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

export default Dashboard;

