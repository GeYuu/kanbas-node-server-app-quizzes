import * as dao from "./dao.js";

export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };

    const findAllUsers = async (req, res) => {
        const { role, name } = req.query;
        if (role) {
            const users = await dao.findUsersByRole(role);
            res.json(users);
            return;
        }
        if (name) {
            const users = await dao.findUsersByPartialName(name);
            res.json(users);
            return;
        }

        const users = await dao.findAllUsers();
        res.json(users);
        return;
    };


    app.get("/api/users", findAllUsers);
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };

    app.get("/api/users/:userId", findUserById);
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        res.json(status);
    };

    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" });
            return;
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };

    const signin = async (req, res) => {
        const { username, password } = req.body;
        try {
            const currentUser = await dao.findUserByCredentials(username, password);
            if (currentUser) {
                req.session.currentUser = currentUser;
                console.log("User signed in, session data:", req.session);
                res.json(currentUser);
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (error) {
            console.error("Signin error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };



    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        console.log("Session data:", req.session); // Add this line
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };




    app.put("/api/users/profile", async (req, res) => {
        console.log("Initial request to update profile received"); // Log when the request starts
        console.log("Session data:", req.session); // Log the session data early

        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            console.log("No user in session"); // This log shows the problem is with the session
            return res.sendStatus(401); // Early return if no session is found
        }

        console.log("User ID from session:", currentUser._id); // Ensure this is a valid ObjectId
        console.log("Profile data being updated:", req.body);

        const updatedUser = await dao.updateUser(currentUser._id, req.body);
        if (!updatedUser) {
            return res.status(400).json({ message: "Update failed" });
        }

        req.session["currentUser"] = { ...currentUser, ...req.body };
        res.json(updatedUser);
    });




    app.put("/api/users/enroll/:userId/:courseId", async (req, res) => {

        const { userId, courseId } = req.params;

        //check if the user is already enrolled
        const user = await dao.findUserById(userId);
        if (user.courses.includes(courseId)) {
            res.status(400).json({ message: "User already enrolled in the course" });
            return;
        }

        const status = await dao.enrollUser(userId, courseId);
        res.json(status);
    }
    );

    app.get("/api/users/enrolled/:userId", async (req, res) => {
        const { userId } = req.params;
        const courses = await dao.findEnrolledCourses(userId);
        res.json(courses);
    }
    );




    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);

}