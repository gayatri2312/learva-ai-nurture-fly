import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";
import { BarChart3, TrendingUp, BookOpen, Target, Clock } from "lucide-react";

const Statistics = () => {
  // Mock data - empty initially
  const enrolledCourses: any[] = [];

  const overallStats = {
    averageScore: 0,
    totalHoursLearned: 0,
    completionRate: 0,
    quizzesCompleted: 0,
    assignmentsCompleted: 0,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Statistics</h1>
          <p className="text-muted-foreground mt-1">Track your progress across all courses</p>
        </div>

        {/* Overall Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Average Score"
            value={`${overallStats.averageScore}%`}
            icon={TrendingUp}
            color="text-primary"
          />
          <StatCard
            title="Hours Learned"
            value={overallStats.totalHoursLearned.toString()}
            icon={Clock}
            color="text-info"
          />
          <StatCard
            title="Completion Rate"
            value={`${overallStats.completionRate}%`}
            icon={Target}
            color="text-success"
          />
          <StatCard
            title="Quizzes Done"
            value={overallStats.quizzesCompleted.toString()}
            icon={BarChart3}
            color="text-warning"
          />
        </div>

        {/* Course Progress */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Course Progress</CardTitle>
            </div>
            <CardDescription>Individual progress for each enrolled course</CardDescription>
          </CardHeader>
          <CardContent>
            {enrolledCourses.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No course data available</h3>
                <p className="text-muted-foreground">
                  Enroll in courses and start learning to see detailed statistics here.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {enrolledCourses.map((course) => (
                  <CourseProgressCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Insights */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Learning Insights</CardTitle>
            </div>
            <CardDescription>AI-powered analysis of your learning patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Start learning to receive personalized insights about your learning style and progress!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
  return (
    <Card className="shadow-soft">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          </div>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </CardContent>
    </Card>
  );
}

function CourseProgressCard({ course }: { course: any }) {
  return (
    <div className="space-y-3 p-4 bg-secondary/30 rounded-lg">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground">{course.title}</h4>
        <span className="text-sm font-medium text-primary">{course.progress}%</span>
      </div>
      <Progress value={course.progress} className="h-2" />
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>Quizzes: {course.quizzesCompleted}/{course.totalQuizzes}</span>
        <span>Assignments: {course.assignmentsCompleted}/{course.totalAssignments}</span>
      </div>
    </div>
  );
}

export default Statistics;
