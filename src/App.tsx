import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Quizzes from "./pages/Quizzes";
import Assignments from "./pages/Assignments";
import Statistics from "./pages/Statistics";
import Materials from "./pages/Materials";
import Recommendations from "./pages/Recommendations";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Badges from "./pages/Badges";
import Goals from "./pages/Goals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/badges" element={<Badges />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
