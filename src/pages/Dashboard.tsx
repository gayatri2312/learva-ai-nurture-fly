import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
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

const Dashboard = () => {
  const { user } = useAuth();

  const stats = {
    overallPerformance: 0,
    streak: 0,
    activeCourses: 0,
    completedCourses: 0,
    totalQuizzes: 0,
    totalAssignments: 0,
    badgesEarned: 0,
  };

  const dailyGoals = [
    { id: 1, title: "Complete a quiz", completed: false },
    { id: 2, title: "Review learning materials", completed: false },
    { id: 3, title: "Enroll in a new course", completed: false },
  ];

  const motivationalQuote = "Every step you take brings you closer to your goals. Keep learning!";

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.name || "Learner"}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Ready to continue your learning journey?
            </p>
          </div>
          <Badge variant="secondary" className="w-fit flex items-center gap-2 px-4 py-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="font-semibold">{stats.streak} Day Streak</span>
          </Badge>
        </div>

        {/* Motivational Quote */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <p className="text-foreground italic">{motivationalQuote}</p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Overall Performance"
            value={`${stats.overallPerformance}%`}
            description="Based on quiz scores"
            icon={TrendingUp}
            iconColor="text-primary"
          />
          <StatsCard
            title="Active Courses"
            value={stats.activeCourses}
            description="Currently enrolled"
            icon={BookOpen}
            iconColor="text-accent"
          />
          <StatsCard
            title="Quizzes Completed"
            value={stats.totalQuizzes}
            description="Keep practicing!"
            icon={Target}
            iconColor="text-blue-500"
          />
          <StatsCard
            title="Badges Earned"
            value={stats.badgesEarned}
            description="Your achievements"
            icon={Award}
            iconColor="text-yellow-500"
          />
        </div>

        {/* Daily Goals Section */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Daily Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dailyGoals.length > 0 ? (
              <div className="space-y-3">
                {dailyGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <CheckCircle2
                      className={`h-5 w-5 ${
                        goal.completed ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`${
                        goal.completed
                          ? "line-through text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {goal.title}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No goals set yet. Start by enrolling in a course!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Courses Completed</span>
                  <span className="font-medium">{stats.completedCourses} / {stats.activeCourses || 0}</span>
                </div>
                <Progress value={stats.activeCourses > 0 ? (stats.completedCourses / stats.activeCourses) * 100 : 0} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Assignments Submitted</span>
                  <span className="font-medium">{stats.totalAssignments}</span>
                </div>
                <Progress value={0} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Empty State Message */}
        <Card className="border-dashed border-2 border-muted-foreground/30">
          <CardContent className="py-8 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Start Your Learning Journey
            </h3>
            <p className="text-muted-foreground">
              Explore courses and enroll to begin tracking your progress!
            </p>
          </CardContent>
        </Card>
      </div>
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
