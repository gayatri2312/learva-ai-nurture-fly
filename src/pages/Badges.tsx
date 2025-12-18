import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Trophy,
  Star,
  Flame,
  BookOpen,
  Target,
  Award,
  Zap,
  Crown,
  Medal,
  Sparkles,
  Lock,
} from "lucide-react";

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  earned: boolean;
  progress?: number;
  requirement?: string;
}

const Badges = () => {
  // Mock badges data
  const badges: BadgeItem[] = [
    {
      id: "1",
      name: "First Steps",
      description: "Enroll in your first course",
      icon: BookOpen,
      color: "text-primary",
      bgColor: "bg-primary/10",
      earned: false,
      requirement: "Enroll in 1 course",
    },
    {
      id: "2",
      name: "Quiz Master",
      description: "Complete 10 quizzes with 80%+ score",
      icon: Trophy,
      color: "text-warning",
      bgColor: "bg-warning/10",
      earned: false,
      progress: 0,
      requirement: "0/10 quizzes completed",
    },
    {
      id: "3",
      name: "Streak Champion",
      description: "Maintain a 7-day learning streak",
      icon: Flame,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      earned: false,
      progress: 0,
      requirement: "0/7 days",
    },
    {
      id: "4",
      name: "Perfect Score",
      description: "Get 100% on any quiz",
      icon: Star,
      color: "text-warning",
      bgColor: "bg-warning/10",
      earned: false,
      requirement: "Score 100% on a quiz",
    },
    {
      id: "5",
      name: "Fast Learner",
      description: "Complete a course in under 2 weeks",
      icon: Zap,
      color: "text-info",
      bgColor: "bg-info/10",
      earned: false,
      requirement: "Complete 1 course quickly",
    },
    {
      id: "6",
      name: "Dedicated Student",
      description: "Study for 50 hours total",
      icon: Target,
      color: "text-success",
      bgColor: "bg-success/10",
      earned: false,
      progress: 0,
      requirement: "0/50 hours studied",
    },
    {
      id: "7",
      name: "Course Collector",
      description: "Enroll in 5 different courses",
      icon: BookOpen,
      color: "text-primary",
      bgColor: "bg-primary/10",
      earned: false,
      progress: 0,
      requirement: "0/5 courses enrolled",
    },
    {
      id: "8",
      name: "Overachiever",
      description: "Complete all daily goals for 30 days",
      icon: Crown,
      color: "text-warning",
      bgColor: "bg-warning/10",
      earned: false,
      progress: 0,
      requirement: "0/30 days",
    },
    {
      id: "9",
      name: "Knowledge Seeker",
      description: "Access 100 learning materials",
      icon: Sparkles,
      color: "text-primary",
      bgColor: "bg-primary/10",
      earned: false,
      progress: 0,
      requirement: "0/100 materials accessed",
    },
    {
      id: "10",
      name: "Academic Excellence",
      description: "Complete 10 courses with 90%+ average",
      icon: Medal,
      color: "text-success",
      bgColor: "bg-success/10",
      earned: false,
      progress: 0,
      requirement: "0/10 courses with 90%+ avg",
    },
  ];

  const earnedBadges = badges.filter((b) => b.earned);
  const lockedBadges = badges.filter((b) => !b.earned);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Badges & Rewards</h1>
          <p className="text-muted-foreground mt-1">
            Earn badges by achieving milestones in your learning journey
          </p>
        </div>

        {/* Summary */}
        <Card className="shadow-soft gradient-primary text-primary-foreground">
          <CardContent className="py-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Award className="h-8 w-8" />
              </div>
              <div>
                <p className="text-lg opacity-90">Badges Earned</p>
                <p className="text-4xl font-bold">
                  {earnedBadges.length} / {badges.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Earned Badges</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {earnedBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
        )}

        {/* Locked Badges */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {earnedBadges.length > 0 ? "Badges to Unlock" : "Available Badges"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lockedBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </div>

        {/* Motivation */}
        <Card className="shadow-soft">
          <CardContent className="py-8">
            <div className="text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Start earning badges today!
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enroll in courses, complete quizzes, and maintain your learning streak to unlock 
                badges and showcase your achievements.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

function BadgeCard({ badge }: { badge: BadgeItem }) {
  const Icon = badge.icon;

  return (
    <Card className={`shadow-soft transition-all ${!badge.earned ? "opacity-70" : ""}`}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div
            className={`w-14 h-14 rounded-xl ${badge.bgColor} flex items-center justify-center relative`}
          >
            <Icon className={`h-7 w-7 ${badge.color}`} />
            {!badge.earned && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                <Lock className="h-3 w-3 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{badge.name}</h3>
              {badge.earned && (
                <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                  Earned
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
            {badge.progress !== undefined && !badge.earned && (
              <div className="mt-3 space-y-1">
                <Progress value={badge.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">{badge.requirement}</p>
              </div>
            )}
            {badge.requirement && badge.progress === undefined && !badge.earned && (
              <p className="text-xs text-muted-foreground mt-2">{badge.requirement}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Badges;
