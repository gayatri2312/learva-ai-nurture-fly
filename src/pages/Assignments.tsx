import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ClipboardList, CheckCircle2, Clock, AlertTriangle, Trophy } from "lucide-react";

const Assignments = () => {
  // Mock data - empty initially
  const completedAssignments: any[] = [];
  const upcomingAssignments: any[] = [];
  const missedAssignments: any[] = [];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Assignments</h1>
          <p className="text-muted-foreground mt-1">Manage your assignments and track submissions</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Completed
            </TabsTrigger>
            <TabsTrigger value="missed" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Missed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAssignments.length === 0 ? (
              <EmptyState
                icon={ClipboardList}
                title="No upcoming assignments"
                description="Enroll in courses to receive assignments."
              />
            ) : (
              <div className="grid gap-4">
                {upcomingAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} type="upcoming" />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedAssignments.length === 0 ? (
              <EmptyState
                icon={Trophy}
                title="No completed assignments"
                description="Complete assignments to see your scores here."
              />
            ) : (
              <div className="grid gap-4">
                {completedAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} type="completed" />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="missed" className="space-y-4">
            {missedAssignments.length === 0 ? (
              <EmptyState
                icon={CheckCircle2}
                title="No missed assignments"
                description="Great job! You haven't missed any assignments."
                positive
              />
            ) : (
              <div className="grid gap-4">
                {missedAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} type="missed" />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

function AssignmentCard({ assignment, type }: { assignment: any; type: "upcoming" | "completed" | "missed" }) {
  const getBadgeVariant = () => {
    switch (type) {
      case "completed":
        return "secondary";
      case "missed":
        return "destructive";
      default:
        return "default";
    }
  };

  const getBadgeText = () => {
    switch (type) {
      case "completed":
        return "Submitted";
      case "missed":
        return "Missed";
      default:
        return "Pending";
    }
  };

  return (
    <Card className="shadow-soft hover:shadow-medium transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">{assignment.title}</h3>
            <p className="text-sm text-muted-foreground">{assignment.course}</p>
            {type === "completed" && (
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-warning" />
                  <span className="font-medium text-foreground">{assignment.score}%</span>
                </div>
                <Progress value={assignment.score} className="w-32 h-2" />
              </div>
            )}
            <div className="flex items-center gap-2 mt-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {type === "missed" ? "Was due: " : "Due: "}
                {assignment.dueDate}
              </span>
            </div>
          </div>
          <Badge variant={getBadgeVariant()}>{getBadgeText()}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  positive = false,
}: {
  icon: any;
  title: string;
  description: string;
  positive?: boolean;
}) {
  return (
    <Card className="shadow-soft">
      <CardContent className="py-12">
        <div className="text-center">
          <div
            className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              positive ? "bg-success/10" : "bg-primary/10"
            }`}
          >
            <Icon className={`h-8 w-8 ${positive ? "text-success" : "text-primary"}`} />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Assignments;
