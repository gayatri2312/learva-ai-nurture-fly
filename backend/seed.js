require("dotenv").config();
const mongoose = require("mongoose");
const Student = require("./server").Student; // or copy schema into seed.js

mongoose.connect(process.env.MONGO_URI).then(async ()=>{
  console.log("✅ MongoDB connected for seeding");

  const student = new Student({
    name:"Subha Mohanraj",
    email:"subha@example.com",
    learningInteractions:{ video:40, audio:30, text:30 },
    topicPerformance:[ {subject:"Math", topic:"Algebra", accuracy:55}, {subject:"Science", topic:"Physics", accuracy:40} ],
    courses:[ {id:"1", name:"Math Basics", progress:30, totalHours:5, status:"on-track", icon:"📘"} ],
    quizzes:{ completed:5, averageScore:60 },
    assignments:{ submitted:3 },
    performanceHistory:[ {week:"Week1", score:50}, {week:"Week2", score:55}, {week:"Week3", score:60} ],
    weeklyEngagement:[ {day:"Mon", hours:2}, {day:"Tue", hours:3}, {day:"Wed", hours:4} ]
  });

  await student.save();
  console.log("✅ Student seeded");
  mongoose.connection.close();
});
