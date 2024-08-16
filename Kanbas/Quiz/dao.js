import model from "./model.js";

export const findAllQuizzes = () => model.find();

export const findQuizById = (id) => model.findById(id);

export const findQuizByCourseId = (course) =>
    model.find({ course: course });

export const deleteQuiz = (id) => model.deleteOne({
    _id: id
});

export const createQuiz = (quiz) => model.create(quiz);

export const updateQuiz = (id, quiz) => model.updateOne({
    _id: id
}, {
    $set: quiz
});

//turn published status to true if false
//turn published status to false if true
export const togglePublished
    = (id) => model.findById(id).then(quiz => {
        quiz.published = !quiz.published;
        return quiz.save();
    });
