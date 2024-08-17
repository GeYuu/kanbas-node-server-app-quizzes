import * as dao from "./dao.js";

export default function QuizTakenRoutes(app) {


    const AddQuizTaken = async (req, res) => {
        try {
            console.log('Request body:', req.body); // Log the request body
            const quizTaken = await dao.addQuizTaken(req.body);
            res.json(quizTaken);
        } catch (err) {
            console.error('Error adding quiz taken:', err);
            res.status(500).json({ message: err.message });
        }

    };

    app.post("/api/quizzes-taken", AddQuizTaken);

    const FindQuizTakenByQuizId = (req, res) => {
        dao.findQuizTakenByQuizId(req.params.quizId)
            .then(quizTaken => res.json(quizTaken))
            .catch(err => res.status(500).json(err));
    };

    app.get("/quizzes-taken/:quizId", FindQuizTakenByQuizId);

    const FindQuizTakenById = (req, res) => {
        dao.findQuizTakenById(req.params.id)
            .then(quizTaken => res.json(quizTaken))
            .catch(err => res.status(500).json(err));
    };

    app.get("/quizzes-taken/:id", FindQuizTakenById);

    const UpdateQuizTaken = (req, res) => {
        dao.updateQuizTaken(req.params.id, req.body)
            .then(quizTaken => res.json(quizTaken))
            .catch(err => res.status(500).json(err));
    };

    app.put("/quizzes-taken/:id", UpdateQuizTaken);

    const NumOfAttempts = async (req, res) => {
        try {
            const { quizId, studentID } = req.params;
            const attempts = await dao.NumOfAttempts(quizId, studentID);
            res.json({ attempts });
        } catch (err) {
            console.error('Error getting number of attempts:', err);
            res.status(500).json({ message: err.message });
        }
    };

    app.get("/api/quizzes-taken/num-of-attempts/:quizId/:studentID", NumOfAttempts);

    const FindQuizTakenByStudentID = async (req, res) => {
        try {
            const quizzesTaken = await dao.findQuizTakenByStudentID(req.params.studentID);
            res.json(quizzesTaken);
        } catch (err) {
            console.error('Error finding quizzes taken by student ID:', err);
            res.status(500).json({ message: err.message });
        }
    };
    app.get("/api/quizzes-taken/student/:studentID", FindQuizTakenByStudentID);

    const findLastAttemptScore = async (req, res) => {
        //if the quiz is not taken yet, return 0
        const quizTaken = await dao.findQuizTakenByQuizIdAndStudentID(req.params.quizId, req.params.studentID);
        if (!quizTaken) {
            res.json({ score: 0 });
        } else {
            res.json({ score: quizTaken.pointsEarned });
        }
    };
    app.get("/api/quizzes-taken/last-attempt-score/:quizId/:studentID", findLastAttemptScore);

    const findQuizTakenByQuizIdAndStudentID = async (req, res) => {
        const quizTaken = await dao.findQuizTakenByQuizIdAndStudentID(req.params.quizId, req.params.studentID);
        res.json(quizTaken);
    };
    app.get("/api/quizzes-taken/:quizId/:studentID", findQuizTakenByQuizIdAndStudentID);

    const findAllQuizTakenByQuizIdAndStudentID = async (req, res) => {
        const quizTaken = await dao.findAllQuizTakenByQuizIdAndStudentID(req.params.quizId, req.params.studentID);
        res.json(quizTaken);
    };
    app.get("/api/quizzes-taken/all/:quizId/:studentID", findAllQuizTakenByQuizIdAndStudentID);










}