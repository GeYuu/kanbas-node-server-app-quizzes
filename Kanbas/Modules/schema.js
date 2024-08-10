import mongoose from "mongoose";
const ModuleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    lessons: [{
        _id: { type: String, required: true },
        name: { type: String, required: true },
        description: String,
        module: String,
    }],
    course: String,


},
    { collection: "modules" }
);
export default ModuleSchema;