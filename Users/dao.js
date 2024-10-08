import model from "./model.js";

export const createUser = (user) => {
    return model.create(user);
}

export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
        $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
};
export const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role })

export const updateUserProfile = (userId, profile) => model.updateOne({ _id: userId }, { $set: profile });

export const enrollUser = (userId, courseId) => model.updateOne({ _id: userId }, { $push: { courses: courseId } });

export const findEnrolledCourses = (userId) => model.findById(userId).select("courses").populate("courses");