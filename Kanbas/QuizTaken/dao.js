import model from "./model.js";

export const findAllQuizzesTaken = () => model.find();

export const findQuizTakenById = (id) => model.findById(id);

export const findQuizTakenByQuizId = (quiz) =>
    model.find({ quiz: quiz });

export const addQuizTaken = (quizTaken) => model.create(quizTaken);

export const updateQuizTaken = (id, quizTaken) => model.updateOne({
    _id: id
}, {
    $set: quizTaken
});

export const NumOfAttempts = (quizID, studentID) => model.countDocuments({
    quizID: quizID,
    studentID: studentID
});

export const findQuizTakenByStudentID = (studentID) => model.find({ studentID: studentID });

export const findLastAttemptScore = (quizID, studentID) => model.find({
    quizID: quizID,
    studentID: studentID
}).sort({
    _id: -1
}).limit(1).then(result => result[0].pointsEarned);

export const findAllQuizTakenByQuizIdAndStudentID = (quizID, studentID) => model.find({
    quizID: quizID,
    studentID: studentID
});

export const findQuizTakenByQuizIdAndStudentID = (quizID, studentID) => model.findOne({
    quizID: quizID,
    studentID: studentID
});