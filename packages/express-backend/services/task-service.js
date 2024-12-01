import mongoose from "mongoose";
import taskModel from "../models/task.js";
import userModel from "../models/user.js";

mongoose.set("debug", true);

/*mongoose
  .connect("mongodb://localhost:27017/tasks", {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));*/

function getTasks(name, description, due_date_time, priority) {
    let promise;
    promise = taskModel.find();
    return promise;
}

function findTaskByID(id) {
    let promise;
    promise = taskModel.findById(id);
    return promise;
}

function findTasksByIDList(ids) {
    let promise;
    promise = taskModel.find({ _id: { $in: ids } });
    return promise;
}

function addTask(task, user) {
    const taskToAdd = new taskModel(task);
    taskToAdd.save();
    console.log(user.task_list);
    const promise = user.save({ task_list: user.task_list.push(taskToAdd.id) });
    return promise;
}

function findTaskByName(name) {
    return taskModel.find({ name: name });
}

function findTaskByPriority(priority) {
    return taskModel.find({ priority: priority });
}

const updateTask = async (id, newtask) => {
    return taskModel.findByIdAndUpdate(id, newtask);
};

const deleteTask = async (id, user) => {
    console.log(id);
    await taskModel.findOneAndDelete({ _id: id });
    user.task_list = user.task_list.filter((taskId) => taskId.toString() !== id);
    const promise = user.save();
    return promise;
};

export default {
    addTask,
    getTasks,
    findTaskByName,
    findTaskByPriority,
    updateTask,
    deleteTask,
    findTaskByID,
    findTasksByIDList
};
