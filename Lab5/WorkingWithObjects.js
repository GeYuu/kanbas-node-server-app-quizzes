const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
};

const module = {
    id: 1,
    name: "NodeJS",
    description: "Learn NodeJS with ExpressJS",
    course: "CS5010",

};
export default function WorkingWithObjects(app) {
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment);
    });
    app.get("/lab5/assignment/title", (req, res) => {
        res.send(assignment.title);
    });
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });
    app.get("/lab5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = parseInt(newScore);
        res.json(assignment);
    });
    app.get("/lab5/assignment/completed", (req, res) => {
        assignment.completed = !assignment.completed;
        res.json(assignment);
    });
    app.get("/lab5/assignment/completed/:status", (req, res) => {
        const { status } = req.params;
        assignment.completed = status === "true";
        res.json(assignment);
    });
    app.get("/lab5/assignment/description/:newDescription", (req, res) => {
        const { newDescription } = req.params;
        assignment.description = newDescription;
        res.json(assignment);
    });




    app.get("/lab5/module", (req, res) => {
        res.json(module);
    });
    app.get("/lab5/module/name", (req, res) => {
        res.send(module.name);
    });
    app.get("/lab5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });


};
