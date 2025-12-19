const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    topic: String,
    subject: String,
    accuracy: Number,
});

const recommendationSchema = new mongoose.Schema({
    type: String,
    icon: String,
    topic: String,
    title: String,
    subject: String,
    reason: String,
    priority: Number,
    estimatedTime: String
});

const studentSchema = new mongoose.Schema({
    name: String,
    learningInteractions: {
        video: Number,
        audio: Number,
        text: Number
    },
    topicPerformance: [topicSchema],
    courses: [{
        id: String,
        name: String,
        progress: Number,
        totalHours: Number
    }],
    quizzes: {
        completed: Number,
        averageScore: Number
    },
    assignments: {
        submitted: Number
    },
    performanceHistory: [{
        date: Date,
        score: Number
    }],
    weeklyEngagement: [{
        week: Number,
        hours: Number
    }],
    weakTopics: [topicSchema],
    recommendations: [recommendationSchema]
});

module.exports = mongoose.model('Student', studentSchema);
