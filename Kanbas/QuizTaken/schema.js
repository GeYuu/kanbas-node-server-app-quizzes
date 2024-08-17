import mongoose from "mongoose";

const schema = new mongoose.Schema({
    studentID: { type: String, required: true },
    quizID: { type: String, required: true },
    scorePercentage: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    pointsEarned: { type: Number, required: true },
    answers: [{
        questionID: { type: String, required: true },
        questionTitle: { type: String, required: true },
        questionType: { type: String, required: true },
        questionOptions: { type: Array, required: true },
        selectedAnswer: { type: String, required: true },
        correctAnswer: { type: String },
        isCorrect: { type: Boolean },

        answer: { type: String, required: true },
        correct: { type: Boolean },

        points: { type: Number, required: true },
        questionPoints: { type: Number, required: true },

    }]

}, { collection: "quizTaken" }
);

export default schema;