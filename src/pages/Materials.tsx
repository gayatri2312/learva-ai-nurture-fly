import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";
import { BookOpen, Video, Headphones, FileText, Play, Clock, CheckCircle2 } from "lucide-react";

const Materials = () => {
  // Mock data - empty initially
  const materials = {
    video: [],
    audio: [],
    pdf: [],
  };

  const learningPreference = {
    video: 0,
    audio: 0,
    text: 0,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Learning Materials</h1>
          <p className="text-muted-foreground mt-1">Access videos, audio, and documents for your courses</p>
        </div>

        {/* Learning Preference Analysis */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Your Learning Style</CardTitle>
            <CardDescription>Based on the materials you use most frequently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <PreferenceCard
                icon={Video}
                label="Video"
                percentage={learningPreference.video}
                color="text-info"
                bgColor="bg-info/10"
              />
              <PreferenceCard
                icon={Headphones}
                label="Audio"
                percentage={learningPreference.audio}
                color="text-warning"
                bgColor="bg-warning/10"
              />
              <PreferenceCard
                icon={FileText}
                label="Text/PDF"
                percentage={learningPreference.text}
                color="text-success"
                bgColor="bg-success/10"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Start learning to discover your preferred learning style!
            </p>
          </CardContent>
        </Card>

        {/* Materials by Type */}
        <Tabs defaultValue="video" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              Audio
            </TabsTrigger>
            <TabsTrigger value="pdf" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Text/PDF
            </TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="space-y-4">
            <EmptyMaterialState type="video" />
          </TabsContent>

          <TabsContent value="audio" className="space-y-4">
            <EmptyMaterialState type="audio" />
          </TabsContent>

          <TabsContent value="pdf" className="space-y-4">
            <EmptyMaterialState type="pdf" />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

function PreferenceCard({
  icon: Icon,
  label,
  percentage,
  color,
  bgColor,
}: {
  icon: any;
  label: string;
  percentage: number;
  color: string;
  bgColor: string;
}) {
  return (
    <div className={`p-4 rounded-lg ${bgColor}`}>
      <div className="flex items-center gap-3">
        <Icon className={`h-6 w-6 ${color}`} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-foreground">{label}</span>
            <span className={`text-sm font-medium ${color}`}>{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>
      </div>
    </div>
  );
}

function EmptyMaterialState({ type }: { type: "video" | "audio" | "pdf" }) {
  const icons = {
    video: Video,
    audio: Headphones,
    pdf: FileText,
  };

  const labels = {
    video: "videos",
    audio: "audio materials",
    pdf: "documents",
  };

  const Icon = icons[type];

  return (
    <Card className="shadow-soft">
      <CardContent className="py-12">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No {labels[type]} available</h3>
          <p className="text-muted-foreground">
            Enroll in courses to access {labels[type]} and other learning materials.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Materials;
