import model from "./model.js";

export const findAllModules = () => model.find();

export const findModuleById = (id) => model.findById(id);

export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });

export const createModule = (module) => {
    return model.create(module);
}

export const updateModule = (moduleId, module) => {
    return model.updateOne({ _id: moduleId }, { $set: module });
}