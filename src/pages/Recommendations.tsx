import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Sparkles, BookOpen, Video, FileText, Target, Brain, Lightbulb } from "lucide-react";

const Recommendations = () => {
  // Mock data - empty initially
  const recommendations = {
    courses: [],
    materials: [],
    studyTips: [],
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">AI Recommendations</h1>
          <p className="text-muted-foreground mt-1">
            Personalized suggestions based on your learning patterns and preferences
          </p>
        </div>

        {/* AI Analysis Card */}
        <Card className="shadow-soft bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="py-8">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                <Brain className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground mb-2">How Our AI Works</h2>
                <p className="text-muted-foreground">
                  Our system uses multiple AI models to analyze your interactions and preferences across 
                  different learning methodologies. By observing how you respond, the AI personalizes 
                  your learning experience exclusively for you, adapting content, practice, and feedback dynamically.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recommended Courses */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Recommended Courses</CardTitle>
              </div>
              <CardDescription>Courses that match your learning goals</CardDescription>
            </CardHeader>
            <CardContent>
              {recommendations.courses.length === 0 ? (
                <EmptyState
                  icon={BookOpen}
                  message="Start learning to receive course recommendations tailored to your interests and goals."
                />
              ) : (
                <div className="space-y-4">
                  {recommendations.courses.map((course: any) => (
                    <RecommendationCard key={course.id} item={course} type="course" />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recommended Materials */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Suggested Materials</CardTitle>
              </div>
              <CardDescription>Content that matches your learning style</CardDescription>
            </CardHeader>
            <CardContent>
              {recommendations.materials.length === 0 ? (
                <EmptyState
                  icon={Video}
                  message="Use more learning materials so our AI can understand your preferences and suggest similar content."
                />
              ) : (
                <div className="space-y-4">
                  {recommendations.materials.map((material: any) => (
                    <RecommendationCard key={material.id} item={material} type="material" />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Study Tips */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-warning" />
              <CardTitle className="text-lg">Personalized Study Tips</CardTitle>
            </div>
            <CardDescription>AI-generated tips to improve your learning</CardDescription>
          </CardHeader>
          <CardContent>
            {recommendations.studyTips.length === 0 ? (
              <div className="grid gap-4 md:grid-cols-3">
                <TipCard
                  title="Get Started"
                  description="Enroll in your first course to begin your personalized learning journey."
                  icon={Target}
                />
                <TipCard
                  title="Be Consistent"
                  description="Learning a little every day is more effective than cramming."
                  icon={Sparkles}
                />
                <TipCard
                  title="Track Progress"
                  description="Complete quizzes regularly to help our AI understand your knowledge gaps."
                  icon={Brain}
                />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {recommendations.studyTips.map((tip: any) => (
                  <TipCard key={tip.id} title={tip.title} description={tip.description} icon={Lightbulb} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

function EmptyState({ icon: Icon, message }: { icon: any; message: string }) {
  return (
    <div className="text-center py-8">
      <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function RecommendationCard({ item, type }: { item: any; type: "course" | "material" }) {
  return (
    <div className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-foreground">{item.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
        </div>
        <Badge variant="secondary">{item.matchScore}% match</Badge>
      </div>
    </div>
  );
}

function TipCard({ title, description, icon: Icon }: { title: string; description: string; icon: any }) {
  return (
    <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 text-warning mt-0.5" />
        <div>
          <h4 className="font-medium text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Recommendations;
