import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data - will be replaced with real data later
  const stats = {
    overallPerformance: 78,
    streak: 12,
    activeCourses: 0,
    completedCourses: 0,
    totalQuizzes: 0,
    totalAssignments: 0,
    hoursLearned: 0,
    badgesEarned: 0,
  };

  const dailyGoals = [
    { id: 1, title: "Complete 1 quiz", completed: false },
    { id: 2, title: "Study for 30 minutes", completed: false },
    { id: 3, title: "Review 5 flashcards", completed: false },
  ];

  const motivationalQuotes = [
    "Every expert was once a beginner. Keep going! 🦋",
    "Small progress is still progress. You've got this!",
    "The only way to do great work is to love what you learn.",
    "Your potential is limitless. Nurture it today!",
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Welcome back, {user?.name || "Learner"}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">{randomQuote}</p>
          </div>
          <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full">
            <Flame className="h-5 w-5 text-warning" />
            <span className="font-semibold text-foreground">{stats.streak} day streak!</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Overall Performance"
            value={`${stats.overallPerformance}%`}
            description="Based on quiz scores"
            icon={TrendingUp}
            iconColor="text-primary"
          />
          <StatsCard
            title="Active Courses"
            value={stats.activeCourses.toString()}
            description="Currently enrolled"
            icon={BookOpen}
            iconColor="text-info"
          />
          <StatsCard
            title="Completed Courses"
            value={stats.completedCourses.toString()}
            description="Finished successfully"
            icon={CheckCircle2}
            iconColor="text-success"
          />
          <StatsCard
            title="Badges Earned"
            value={stats.badgesEarned.toString()}
            description="Achievements unlocked"
            icon={Award}
            iconColor="text-warning"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Daily Goals */}
          <Card className="lg:col-span-1 shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Daily Goals</CardTitle>
              </div>
              <CardDescription>Complete these to maintain your streak</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dailyGoals.map((goal) => (
                <div
                  key={goal.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    goal.completed
                      ? "bg-success/10 border-success/20"
                      : "bg-secondary/50 border-border"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      goal.completed ? "border-success bg-success" : "border-muted-foreground"
                    }`}
                  >
                    {goal.completed && <CheckCircle2 className="h-3 w-3 text-success-foreground" />}
                  </div>
                  <span className={goal.completed ? "line-through text-muted-foreground" : "text-foreground"}>
                    {goal.title}
                  </span>
                </div>
              ))}
              <p className="text-xs text-muted-foreground text-center mt-4">
                Enroll in courses to unlock personalized daily goals!
              </p>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card className="lg:col-span-2 shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Progress Overview</CardTitle>
              </div>
              <CardDescription>Your learning journey at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.activeCourses === 0 ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No courses enrolled yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start your learning journey by exploring and enrolling in courses.
                  </p>
                  <Badge variant="secondary" className="cursor-pointer">
                    Browse Courses →
                  </Badge>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Course progress will be displayed here */}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recommendations Preview */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">AI Recommendations</CardTitle>
            </div>
            <CardDescription>Personalized suggestions based on your learning style</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-primary animate-pulse-soft" />
              </div>
              <p className="text-muted-foreground">
                Start learning to receive personalized recommendations from our AI!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor,
}: {
  title: string;
  value: string;
  description: string;
  icon: any;
  iconColor: string;
}) {
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
