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
    promise = taskModel.find({ _id: { $in: ids }});
    return promise;
}

function addTask(task) {
    const taskToAdd = new taskModel(task);
    taskToAdd.save();
    const promise = userModel.save({task_list: task});
    return promise;
}

function findTaskByName(name) {
    return taskModel.find({ name: name });
}

function findTaskByPriority(priority) {
    return taskModel.find({ priority: priority });
}

const deleteTask = (name) => {
    findOneandDelete({ name: name });
};

export default {
    addTask,
    getTasks,
    findTaskByName,
    findTaskByPriority,
    deleteTask,
    findTaskByID,
    findTasksByIDList
};
