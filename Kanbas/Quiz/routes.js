import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    const findAllQuizzes = async (req, res) => {

        const quizzes = await dao.findAllQuizzes();
        res.json(quizzes);
    };
    app.get("/api/quizzes", findAllQuizzes);


    const findQuizById = async (req, res) => {
        const quiz = await dao.findQuizById(req.params.qid);
        res.json(quiz);
    }
    app.get("/api/quizzes/:qid", findQuizById);

    const findQuizByCourseID = async (req, res) => {
        const quizzes = await dao.findQuizByCourseId(req.params.cid);
        res.json(quizzes);
    }
    app.get("/api/courses/:cid/quizzes", findQuizByCourseID);

    const deleteQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.deleteQuiz(qid);
        res.json(status);
    }
    app.delete("/api/quizzes/:qid", deleteQuiz);

    const createQuiz = async (req, res) => {
        const quiz = await dao.createQuiz({ ...req.body });
        res.status(201).json(quiz);

    };

    app.post("/api/quizzes", createQuiz);

    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.updateQuiz(qid, req.body);
        res.json(status);
    };
    app.put("/api/quizzes/:qid", updateQuiz);


    const togglePublished = async (req, res) => {
        const { qid } = req.params;
        const quiz = await dao.togglePublished(qid);
        res.json(quiz);
    }
    app.put("/api/quizzes/:qid/publish", togglePublished);


}


