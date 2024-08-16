import mongoose from "mongoose";

const ChoiceSchema = new mongoose.Schema({
    text: String,
    isCorrect: Boolean,
});

const BlankAnswerSchema = new mongoose.Schema({
    id: String,
    text: String,
});

const QuestionSchema = new mongoose.Schema({
    id: String,
    title: String,
    type: String,
    questionText: String,
    points: Number,
    choices: [ChoiceSchema],  // Array of choices for multiple-choice questions
    isTrue: Boolean,           // Used for true/false questions
    correctAnswers: [BlankAnswerSchema],  // Array of correct answers for fill-in-the-blank questions
});

const QuizSchema = new mongoose.Schema({
    title: String,
    course: { type: String, required: true },
    quizType: String,
    assignmentgroup: String,
    shuffleAnswers: Boolean,
    timeLimit: Boolean,
    timeLimitEntry: Number,
    allowMultipleAttempts: Boolean,
    showCorrectedAnswers: Boolean,
    accessCode: Boolean,
    accessCodeEntry: Number,
    oneQuestionAtATime: Boolean,
    webCamRequired: Boolean,
    lockQuestionsAfterAnswering: Boolean,
    _id: String,
    description: String,
    points: Number,
    dueDate: String,
    availableFrom: String,
    availableUntil: String,
    published: Boolean,
    questions: [QuestionSchema],  // Array of questions, now with a full structure
}, { collection: "Quizzes" });

export default QuizSchema;
