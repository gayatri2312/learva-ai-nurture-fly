import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Trophy, Brain } from "lucide-react";
import learvaLogo from "@/assets/learva-logo.png";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={learvaLogo} alt="Learva AI" className="h-10 w-auto" />
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild className="gradient-primary text-primary-foreground">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute top-60 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-learva-teal/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto text-center relative">
          <div className="animate-float mb-8">
            <img src={learvaLogo} alt="Learva AI" className="h-32 w-auto mx-auto" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 animate-fade-in">
            Nurture Today,{" "}
            <span className="text-gradient">Fly Tomorrow</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Experience personalized learning powered by AI that adapts to your unique style, 
            pace, and goals. Transform your educational journey with Learva AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button asChild size="lg" className="gradient-primary text-primary-foreground px-8 py-6 text-lg shadow-glow hover:opacity-90 transition-all">
              <Link to="/signup">Start Learning Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8 py-6 text-lg">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-foreground mb-4">
            Why Choose Learva AI?
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Our AI-powered platform creates a learning experience tailored just for you
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Brain}
              title="AI-Powered Learning"
              description="Multiple AI models analyze your interactions to create truly personalized learning paths"
            />
            <FeatureCard
              icon={Sparkles}
              title="Adaptive Content"
              description="Content adapts dynamically based on your learning style - visual, audio, or text-based"
            />
            <FeatureCard
              icon={Trophy}
              title="Progress Tracking"
              description="Track your progress with detailed statistics, badges, and personalized goals"
            />
            <FeatureCard
              icon={BookOpen}
              title="Rich Resources"
              description="Access videos, PDFs, audio materials and more - all curated for your success"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-foreground mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StepCard
              step={1}
              title="Create Your Profile"
              description="Sign up and tell us about your major, year, and learning preferences"
            />
            <StepCard
              step={2}
              title="Enroll in Courses"
              description="Browse and enroll in courses that match your academic goals"
            />
            <StepCard
              step={3}
              title="Learn & Grow"
              description="Experience personalized learning that evolves with your progress"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of students who are already experiencing the future of education with Learva AI.
          </p>
          <Button asChild size="lg" className="gradient-primary text-primary-foreground px-8 py-6 text-lg shadow-glow">
            <Link to="/signup">Get Started Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={learvaLogo} alt="Learva AI" className="h-8 w-auto" />
            <span className="text-sm text-muted-foreground">
              Nurture Today, Fly Tomorrow
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Learva AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="bg-card p-6 rounded-xl shadow-soft border border-border hover:shadow-medium transition-shadow">
      <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

function StepCard({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
        <span className="text-2xl font-bold text-primary-foreground">{step}</span>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default Index;
