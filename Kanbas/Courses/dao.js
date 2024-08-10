import model from "./model.js";

export const findAllCourses = () => model.find();

export const findCourseById = (id) => model.findById(id);

export const deleteCourse = (id) => model.deleteOne({ _id: id });

export const createCourse = (course) => model.create(course);

export const updateCourse = (id, course) => model.updateOne({ _id: id }, { $set: course });