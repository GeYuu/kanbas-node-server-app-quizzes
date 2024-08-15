import mongoose from "mongoose";
const QuizSchema = new mongoose.Schema({
    title: String,
    course: { type: String, required: true },  // Ensure this is required
    quizType: String,
    assignmentgroup: String,
    shuffleAnswers: String,
    timeLimit: String,
    timeLimitEntry: Number,
    allowMultipleAttempts: String,
    showCorrectedAnswers: String,
    accessCode: String,
    accessCodeEntry: Number,
    oneQuestionAtATime: String,
    webCamRequired: String,
    lockQuestionsAfterAnswering: String,
    _id: String,
    description: String,
    points: Number,
    dueDate: String,
    availableFrom: String,
    availableUntil: String,
    questions: [
        {
            id: Number,
            question: String,
            type: String,
            answer: String,
        },
    ],
},
    { collection: "Quizzes" });

export default QuizSchema;
