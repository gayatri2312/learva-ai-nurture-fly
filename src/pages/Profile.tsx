import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, BookOpen, GraduationCap, Award, Calendar, Trophy } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  // Mock profile data
  const profileData = {
    name: user?.name || "Demo User",
    email: user?.email || "demo@university.edu",
    major: user?.major || "Computer Science",
    collegeYear: user?.collegeYear || "3rd Year",
    joinedDate: "January 2024",
    coursesEnrolled: 0,
    coursesFinished: 0,
    totalBadges: 0,
    totalQuizzes: 0,
    totalAssignments: 0,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account and view your achievements</p>
        </div>

        {/* Profile Card */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-3xl font-bold text-primary-foreground">
                  {profileData.name.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-semibold text-foreground">{profileData.name}</h2>
                <p className="text-muted-foreground mt-1">{profileData.email}</p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {profileData.major}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <GraduationCap className="h-3 w-3" />
                    {profileData.collegeYear}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Joined {profileData.joinedDate}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={BookOpen}
            label="Courses Enrolled"
            value={profileData.coursesEnrolled}
            color="text-primary"
          />
          <StatCard
            icon={Trophy}
            label="Courses Finished"
            value={profileData.coursesFinished}
            color="text-success"
          />
          <StatCard
            icon={Award}
            label="Badges Earned"
            value={profileData.totalBadges}
            color="text-warning"
          />
          <StatCard
            icon={GraduationCap}
            label="Quizzes Completed"
            value={profileData.totalQuizzes}
            color="text-info"
          />
        </div>

        {/* Account Details */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Account Details</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DetailRow icon={User} label="Full Name" value={profileData.name} />
            <Separator />
            <DetailRow icon={Mail} label="Email Address" value={profileData.email} />
            <Separator />
            <DetailRow icon={BookOpen} label="Major" value={profileData.major} />
            <Separator />
            <DetailRow icon={GraduationCap} label="College Year" value={profileData.collegeYear} />
          </CardContent>
        </Card>

        {/* Learning Summary */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Learning Summary</CardTitle>
            <CardDescription>Your learning journey overview</CardDescription>
          </CardHeader>
          <CardContent>
            {profileData.coursesEnrolled === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Start your journey</h3>
                <p className="text-muted-foreground">
                  Enroll in courses to see your learning summary here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">{/* Learning summary content would go here */}</div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <Card className="shadow-soft">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default Profile;
