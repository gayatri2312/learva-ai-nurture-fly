import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FileQuestion, CheckCircle2, Clock, Trophy, AlertCircle } from "lucide-react";

const Quizzes = () => {
  // Mock data - empty initially
  const attemptedQuizzes: any[] = [];
  const upcomingQuizzes: any[] = [];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Quizzes</h1>
          <p className="text-muted-foreground mt-1">Track your quiz performance and upcoming assessments</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              To Attempt
            </TabsTrigger>
            <TabsTrigger value="attempted" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Attempted
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingQuizzes.length === 0 ? (
              <EmptyState
                icon={FileQuestion}
                title="No quizzes available"
                description="Enroll in courses to get access to quizzes and assessments."
              />
            ) : (
              <div className="grid gap-4">
                {upcomingQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} type="upcoming" />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="attempted" className="space-y-4">
            {attemptedQuizzes.length === 0 ? (
              <EmptyState
                icon={Trophy}
                title="No quizzes attempted yet"
                description="Complete quizzes to see your scores and performance here."
              />
            ) : (
              <div className="grid gap-4">
                {attemptedQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} type="attempted" />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

function QuizCard({ quiz, type }: { quiz: any; type: "upcoming" | "attempted" }) {
  return (
    <Card className="shadow-soft hover:shadow-medium transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">{quiz.title}</h3>
            <p className="text-sm text-muted-foreground">{quiz.course}</p>
            {type === "attempted" && (
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-warning" />
                  <span className="font-medium text-foreground">{quiz.score}%</span>
                </div>
                <Progress value={quiz.score} className="w-32 h-2" />
              </div>
            )}
            {type === "upcoming" && (
              <div className="flex items-center gap-2 mt-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Due: {quiz.dueDate}</span>
              </div>
            )}
          </div>
          <Badge variant={type === "attempted" ? "secondary" : "default"}>
            {type === "attempted" ? "Completed" : "Pending"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <Card className="shadow-soft">
      <CardContent className="py-12">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Quizzes;
