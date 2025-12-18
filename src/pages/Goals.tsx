import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import {
  Target,
  Flame,
  CheckCircle2,
  Trophy,
  Plus,
  Sparkles,
  RotateCcw,
} from "lucide-react";

interface Goal {
  id: string;
  title: string;
  completed: boolean;
  type: "study" | "quiz" | "assignment" | "custom";
}

const Goals = () => {
  const { toast } = useToast();

  // Mock daily goals - personalized based on user's courses
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", title: "Study for 30 minutes", completed: false, type: "study" },
    { id: "2", title: "Complete 1 quiz", completed: false, type: "quiz" },
    { id: "3", title: "Review learning materials", completed: false, type: "study" },
  ]);

  const [streak, setStreak] = useState(12);

  const toggleGoal = (id: string) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === id) {
          const newCompleted = !goal.completed;
          if (newCompleted) {
            toast({
              title: "Goal completed! 🎉",
              description: "Great job! Keep up the momentum.",
            });
          }
          return { ...goal, completed: newCompleted };
        }
        return goal;
      })
    );
  };

  const completedGoals = goals.filter((g) => g.completed).length;
  const progress = goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;

  const getMotivationalMessage = () => {
    if (progress === 100) return "🏆 Amazing! You've completed all your goals for today!";
    if (progress >= 66) return "🌟 Almost there! Just a few more goals to go!";
    if (progress >= 33) return "💪 Good progress! You're doing great!";
    return "🚀 Let's get started! You've got this!";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Daily Goals</h1>
          <p className="text-muted-foreground mt-1">
            Complete your personalized goals to maintain your streak
          </p>
        </div>

        {/* Streak Card */}
        <Card className="shadow-soft gradient-primary text-primary-foreground overflow-hidden">
          <CardContent className="py-6 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Flame className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-lg opacity-90">Current Streak</p>
                  <p className="text-4xl font-bold">{streak} Days</p>
                </div>
              </div>
              <Trophy className="h-24 w-24 opacity-10 absolute right-4" />
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Today's Progress</CardTitle>
              </div>
              <span className="text-lg font-bold text-primary">
                {completedGoals}/{goals.length}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progress} className="h-3" />
            <p className="text-center text-muted-foreground">{getMotivationalMessage()}</p>
          </CardContent>
        </Card>

        {/* Goals List */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Your Goals for Today</CardTitle>
            <CardDescription>
              These goals are personalized based on your enrolled courses and learning patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer ${
                  goal.completed
                    ? "bg-success/10 border-success/20"
                    : "bg-secondary/30 border-border hover:bg-secondary/50"
                }`}
                onClick={() => toggleGoal(goal.id)}
              >
                <Checkbox
                  checked={goal.completed}
                  onCheckedChange={() => toggleGoal(goal.id)}
                  className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                />
                <span
                  className={`flex-1 ${
                    goal.completed ? "line-through text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {goal.title}
                </span>
                {goal.completed && <CheckCircle2 className="h-5 w-5 text-success" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Personalization Info */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">AI-Personalized Goals</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Your daily goals are automatically generated based on:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Your enrolled courses and progress
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Upcoming quizzes and assignments
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Your learning patterns and preferences
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Optimal study time recommendations
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Enroll in courses to receive more personalized daily goals!
            </p>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="shadow-soft bg-warning/5 border-warning/20">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                <Flame className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Keep Your Streak Alive!</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Complete at least one goal each day to maintain your streak. Consistent learning 
                  leads to better retention and faster mastery!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Goals;
