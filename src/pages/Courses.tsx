import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { Search, BookOpen, Clock, Users, Star, Plus, CheckCircle } from "lucide-react";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Mock available courses data
  const availableCourses = [
    {
      id: "1",
      title: "Introduction to Computer Science",
      description: "Learn the fundamentals of programming and computational thinking",
      instructor: "Dr. Sarah Johnson",
      duration: "12 weeks",
      students: 1234,
      rating: 4.8,
      category: "Computer Science",
      difficulty: "Beginner",
    },
    {
      id: "2",
      title: "Data Structures & Algorithms",
      description: "Master essential data structures and algorithm design techniques",
      instructor: "Prof. Michael Chen",
      duration: "10 weeks",
      students: 892,
      rating: 4.9,
      category: "Computer Science",
      difficulty: "Intermediate",
    },
    {
      id: "3",
      title: "Machine Learning Fundamentals",
      description: "Explore the basics of machine learning and AI applications",
      instructor: "Dr. Emily Roberts",
      duration: "8 weeks",
      students: 2156,
      rating: 4.7,
      category: "Artificial Intelligence",
      difficulty: "Intermediate",
    },
    {
      id: "4",
      title: "Calculus I",
      description: "A comprehensive introduction to differential and integral calculus",
      instructor: "Prof. David Williams",
      duration: "14 weeks",
      students: 3421,
      rating: 4.6,
      category: "Mathematics",
      difficulty: "Beginner",
    },
    {
      id: "5",
      title: "Organic Chemistry",
      description: "Study the structure, properties, and reactions of organic compounds",
      instructor: "Dr. Lisa Anderson",
      duration: "16 weeks",
      students: 756,
      rating: 4.5,
      category: "Chemistry",
      difficulty: "Advanced",
    },
    {
      id: "6",
      title: "Web Development Bootcamp",
      description: "Build modern web applications from scratch with HTML, CSS, and JavaScript",
      instructor: "James Wilson",
      duration: "10 weeks",
      students: 4532,
      rating: 4.9,
      category: "Computer Science",
      difficulty: "Beginner",
    },
  ];

  // Mock enrolled courses - initially empty
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  const filteredCourses = availableCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEnroll = (courseId: string, courseTitle: string) => {
    if (enrolledCourseIds.includes(courseId)) {
      toast({
        title: "Already enrolled",
        description: `You are already enrolled in ${courseTitle}`,
      });
      return;
    }

    setEnrolledCourseIds([...enrolledCourseIds, courseId]);
    toast({
      title: "Successfully enrolled! 🎉",
      description: `You are now enrolled in ${courseTitle}. Your progress starts at 0%.`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-success/10 text-success";
      case "Intermediate":
        return "bg-warning/10 text-warning";
      case "Advanced":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Browse Courses</h1>
          <p className="text-muted-foreground mt-1">Search and enroll in courses to start learning</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses by name, category, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Enrolled Summary */}
        {enrolledCourseIds.length > 0 && (
          <Card className="shadow-soft bg-primary/5 border-primary/20">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-foreground">
                  You are enrolled in <strong>{enrolledCourseIds.length}</strong> course
                  {enrolledCourseIds.length > 1 ? "s" : ""}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Course Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledCourseIds.includes(course.id);
            return (
              <Card key={course.id} className="shadow-soft hover:shadow-medium transition-all group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="text-sm font-medium text-foreground">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-3 group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{course.instructor}</span>
                  </div>

                  {isEnrolled ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-primary">0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                      <Button variant="secondary" className="w-full" disabled>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Enrolled
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full gradient-primary text-primary-foreground"
                      onClick={() => handleEnroll(course.id, course.title)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Enroll Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="shadow-soft">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Courses;
