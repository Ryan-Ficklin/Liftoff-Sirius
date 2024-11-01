import mongoose from "mongoose";
import taskModel from "../models/task.js";

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

function addTask(task) {
  const taskToAdd = new taskModel(task);
  const promise = taskToAdd.save();
  return promise;
}

function findTaskByName(name) {
  return userModel.find({ name: name });
}

function findTaskByPriority(priority) {
  return userModel.find({ priority: priority });
}

const deleteTask = (name) => {
    findOneandDelete({name: name});
}


export default {
  addTask,
  getTasks,
  findTaskByName,
  findTaskByPriority,
  deleteTask,
};