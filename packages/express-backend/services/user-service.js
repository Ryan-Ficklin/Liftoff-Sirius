import mongoose from "mongoose";
import userModel from "../models/user.js";

mongoose.set("debug", true);

function getUsers(username, email) {
    let promise;
    if (username === undefined && email === undefined) {
        promise = userModel.find();
    } else if (username && !email) {
        promise = findUserByUsername(username);
    } else if (!username && email) {
        promise = findUserByEmail(email);
    } else {
        promise = findUserByUsernameAndEmail(username, email);
    }
    return promise;
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

function addTaskIDToUser(username, taskID) {
    return userModel.updateOne({ username: username }, { $push: { task_list: taskID } });
}

const deleteUser = (username) => {
    findOneandDelete({ username: username });
};

function findUserByUsername(username) {
    return userModel.findOne({ username: username });
}

function findUserByTask(task_list) {
    return userModel.find({ task_list: task_list });
}

function findUserByEmail(email) {
    return userModel.find({ email: email });
}

function findUserByUsernameAndEmail(username, email) {
    return userModel.find({ username: username, email: email });
}

export default {
    addUser,
    getUsers,
    findUserByUsername,
    findUserByTask,
    deleteUser,
    addTaskIDToUser
};
