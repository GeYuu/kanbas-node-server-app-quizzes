import express from 'express'
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import cors from "cors";
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentsRoutes from './Kanbas/Assignments/routes.js';
import "dotenv/config";
import mongoose from "mongoose";

import session from "express-session";
import UserRoutes from "./Users/routes.js";
import QuizRoutes from './Kanbas/Quiz/routes.js';
import QuizTakenRoutes from './Kanbas/QuizTaken/routes.js';



const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};


if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}


app.use(session(sessionOptions));


app.use(express.json());
UserRoutes(app);
Lab5(app)
Hello(app)
CourseRoutes(app);
ModuleRoutes(app);
QuizRoutes(app);
QuizTakenRoutes(app);

AssignmentsRoutes(app);
app.listen(process.env.PORT || 4000)