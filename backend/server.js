require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 5000;

/* =======================
   MIDDLEWARE
======================= */
app.use(cors());
app.use(express.json());

/* =======================
   MONGODB CONNECTION
======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* =======================
   STUDENT MODEL
======================= */
const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // hashed password
  major: String,
  collegeYear: String,

  learningInteractions: {
    video: { type: Number, default: 0 },
    audio: { type: Number, default: 0 },
    text: { type: Number, default: 0 },
  },

  topicPerformance: [
    {
      subject: String,
      topic: String,
      accuracy: Number,
    },
  ],

  courses: [
    {
      id: String,
      name: String,
      progress: Number,
      totalHours: Number,
      status: String,
      icon: String,
    },
  ],

  quizzes: {
    completed: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
  },

  assignments: {
    submitted: { type: Number, default: 0 },
  },

  performanceHistory: [
    {
      week: String,
      score: Number,
    },
  ],

  weeklyEngagement: [
    {
      day: String,
      hours: Number,
    },
  ],
});

const Student = mongoose.model("Student", StudentSchema);

/* =======================
   HELPER FUNCTIONS
======================= */

// Learning Style Detection
function detectLearningStyle(interactions) {
  const total = interactions.video + interactions.audio + interactions.text || 1;

  const videoPercent = (interactions.video / total) * 100;
  const audioPercent = (interactions.audio / total) * 100;
  const textPercent = (interactions.text / total) * 100;

  let preferredStyle = "Video";
  let maxPercent = videoPercent;
  let icon = "🎥";

  if (audioPercent > maxPercent) {
    preferredStyle = "Audio";
    maxPercent = audioPercent;
    icon = "🎧";
  }

  if (textPercent > maxPercent) {
    preferredStyle = "Text";
    maxPercent = textPercent;
    icon = "📚";
  }

  return {
    style: preferredStyle,
    confidence: maxPercent.toFixed(1),
    icon,
    distribution: {
      video: videoPercent.toFixed(1),
      audio: audioPercent.toFixed(1),
      text: textPercent.toFixed(1),
    },
  };
}

// Weak Topic Identification
function generateRemedialSuggestions(topic) {
  if (topic.accuracy < 50) {
    return [
      "Start with beginner-level tutorials",
      "Practice fundamental concepts daily",
      "Join study group sessions",
    ];
  }
  if (topic.accuracy < 70) {
    return [
      "Review intermediate materials",
      "Complete practice problems",
      "Watch recap videos",
    ];
  }
  return [];
}

function identifyWeakTopics(topicPerformance) {
  return topicPerformance
    .filter((t) => t.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
    .map((t) => ({
      ...t,
      severity: t.accuracy < 50 ? "red" : "yellow",
      suggestions: generateRemedialSuggestions(t),
    }));
}

// Recommendation Engine
function calculatePriority(accuracy) {
  return 100 - accuracy;
}

function calculateEstimatedTime(accuracy) {
  if (accuracy < 50) return "8–10 hours";
  if (accuracy < 70) return "4–6 hours";
  return "2–3 hours";
}

function generateRecommendationReason(topic, resourceType) {
  if (topic.accuracy < 50) {
    return `🔴 Critical: Your accuracy in ${topic.topic} is ${topic.accuracy}%. This ${resourceType.toLowerCase()} resource will help build foundations.`;
  }
  return `🟡 Needs Attention: Improve your understanding of ${topic.topic} using this ${resourceType.toLowerCase()} resource.`;
}

function generateRecommendations(weakTopics, learningStyle) {
  return weakTopics
    .map((topic) => ({
      type: learningStyle.style,
      icon: learningStyle.icon,
      topic: topic.topic,
      title: `${learningStyle.style} Tutorial: ${topic.topic}`,
      subject: topic.subject,
      reason: generateRecommendationReason(topic, learningStyle.style),
      priority: calculatePriority(topic.accuracy),
      estimatedTime: calculateEstimatedTime(topic.accuracy),
    }))
    .sort((a, b) => b.priority - a.priority);
}

// Performance Level
function calculatePerformanceLevel(courses, quizAverage) {
  const avgProgress =
    courses.reduce((sum, c) => sum + c.progress, 0) / (courses.length || 1);

  const score = avgProgress * 0.6 + quizAverage * 0.4;

  if (score >= 80) return { level: "Advanced", score: score.toFixed(1) };
  if (score >= 60) return { level: "Intermediate", score: score.toFixed(1) };
  return { level: "Beginner", score: score.toFixed(1) };
}

// Motivation
function generateEncouragementMessage(history, engagement) {
  const recent = history.slice(-3).map((h) => h.score || 0);
  const trend = recent[2] - recent[0] || 0;
  const avgHours =
    engagement.reduce((sum, e) => sum + (e.hours || 0), 0) / (engagement.length || 1);

  if (trend > 5) return "🎉 Excellent improvement! Keep it up!";
  if (trend > 0) return "📈 You're improving steadily. Stay consistent!";
  if (avgHours > 4) return "💪 Great consistency this week!";
  return "🌟 Every expert was once a beginner. Keep learning!";
}

/* =======================
   API ROUTES
======================= */

// Signup
app.post("/api/signup", async (req, res) => {
  const { name, email, password, major, collegeYear } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });

  const existing = await Student.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const newStudent = new Student({
    name,
    email,
    password: hashed,
    major,
    collegeYear,
  });

  await newStudent.save();
  res.json({ user: { id: newStudent._id, name, email, major, collegeYear } });
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  if (!student) return res.status(400).json({ message: "Invalid email/password" });

  const match = await bcrypt.compare(password, student.password);
  if (!match) return res.status(400).json({ message: "Invalid email/password" });

  res.json({ user: { id: student._id, name: student.name, email: student.email, major: student.major, collegeYear: student.collegeYear } });
});

// Get student dashboard data by user ID
app.get("/api/student/:id", async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  if (!student) return res.status(404).json({ message: "Student not found" });

  const learningStyle = detectLearningStyle(student.learningInteractions);
  const weakTopics = identifyWeakTopics(student.topicPerformance);
  const recommendations = generateRecommendations(weakTopics, learningStyle);
  const performanceLevel = calculatePerformanceLevel(
    student.courses,
    student.quizzes.averageScore
  );
  const encouragement = generateEncouragementMessage(
    student.performanceHistory,
    student.weeklyEngagement
  );

  res.json({
    ...student.toObject(),
    learningStyle,
    weakTopics,
    recommendations,
    performanceLevel,
    encouragement,
  });
});

// Update course progress
app.post("/api/student/update", async (req, res) => {
  const { studentId, courseId, progress } = req.body;
  const student = await Student.findById(studentId);
  if (!student) return res.status(404).json({ message: "Student not found" });

  const course = student.courses.find((c) => c.id === courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  course.progress = progress;
  await student.save();
  res.json({ success: true });
});

/* =======================
   SERVER START
======================= */
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
