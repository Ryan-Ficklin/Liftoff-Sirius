import mongoose from "mongoose";
import userModel from "../models/user.js";

mongoose.set("debug", true);

/*mongoose
  .connect("mongodb://localhost:27017/users", {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));*/

function getUsers(username, password, task_list, email) {
  let promise;
  promise = userModel.find();
  return promise;
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

const deleteUser = (username) => {
    findOneandDelete({username: username});
}

function findUserByUsername(username) {
  return userModel.find({ username: username });
}

function findUserByTask(task_list) {
  return userModel.find({ task_list: task_list });
}



export default {
  addUser,
  getUsers,
  findUserByUsername,
  findUserByTask,
  deleteUser,
};