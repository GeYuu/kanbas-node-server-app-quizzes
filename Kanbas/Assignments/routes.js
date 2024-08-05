import db from "../Database/index.js";

export default function AssignmentsRoutes(app) {
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((a) => a.course === cid);
        res.json(assignments);
    });

    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            _id: new Date().getTime().toString(),
            course: cid
        };
        db.assignments.push(newAssignment);
        res.json(newAssignment);
    });

    app.delete("/api/courses/:cid/assignments/:aid", (req, res) => {
        const { cid, aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(204);
    });

    app.put("/api/courses/:cid/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const updatedAssignment = req.body;
        db.assignments = db.assignments.map((a) =>
            a._id === aid ? { ...a, ...updatedAssignment } : a
        );
        res.sendStatus(204);
    });
}
