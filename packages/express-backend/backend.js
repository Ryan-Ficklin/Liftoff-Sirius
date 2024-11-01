// backend.js
import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import mongoose from "mongoose";

import userService from "./services/user-service.js";
import taskService from "./services/task-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
if (mongoose.connection.readyState === 0) {
  mongoose.connect(MONGO_CONNECTION_STRING).catch((error) => console.log(error));
} else {
  console.log("Already connected to MongoDB");
}
// mongoose
//   .connect(MONGO_CONNECTION_STRING)
//   .catch((error) => console.log(error));
  
const app = express();
const port = 8000;

const addUser = (user) => {
  const NewUser = { ...user};
  users["users_list"].push(NewUser);
  return NewUser;
};

const addTask = (task) => {
  const NewTask = { ...task};
  tasks["tasks_list"].push(NewTask);
  return NewTask;
};

const generateID = () => {
  return Math.random().toString(36).substr(2, 6);
};

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  const task_list = req.query.task_list;
  const email = req.query.email;
  try {
    const users = await userService.getUsers(username, password, task_list, email);
    res.status(200).json({ users_list: users });
  } catch (error) {
    res.status(500).send("Error fetching users: " + error.message);
  }
});

app.get("/tasks", async (req, res) => {
  const name = req.query.name;
  const description = req.query.description;
  const due_date_time = req.query.due_date_time;
  const priority = req.query.priority
  try {
    const tasks = await taskService.getTasks(name, description, due_date_time, priority);
    res.status(200).json({ tasks_list: tasks });
  } catch (error) {
    res.status(500).send("Error fetching tasks: " + error.message);
  }
});

app.get("/users/:username", async (req, res) => {
  const username = req.params["username"];
  try {
    const result = await userService.findUserByUsername(username);
    if (!result) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).send("Error fetching user: " + error.message);
  }
});

app.get("/users/:task_list", async (req, res) => {
  const task_list = req.params["task_list"];
  try {
    const result = await userService.findUserByTask(task_list);
    if (!result) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).send("Error fetching user: " + error.message);
  }
});

app.get("/tasks/:name", async (req, res) => {
  const name = req.params["name"];
  try {
    const result = await userService.findTaskByName(name);
    if (!result) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).send("Error fetching user: " + error.message);
  }
});

app.get("/tasks/:priority", async (req, res) => {
  const priority = req.params["priority"];
  try {
    const result = await userService.findTaskByPrioity(priority);
    if (!result) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).send("Error fetching user: " + error.message);
  }
});

app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  const addedUser = addUser(userToAdd);
  try {
    const addedUser = await userService.addUser(userToAdd);
    res.status(201).json(addedUser);
  } catch (error) {
    res.status(500).send("Error adding user: " + error.message);
  }
});

app.post("/tasks", async (req, res) => {
  const taskToAdd = req.body;
  const addedTask = addTask(taskToAdd);
  try {
    const addedTask = await userService.addTask(taskToAdd);
    res.status(201).json(addedTask);
  } catch (error) {
    res.status(500).send("Error adding user: " + error.message);
  }
});

app.delete("/users/:username", async (req, res) => {
  const username = req.params["username"];
  try {
    const result = await userService.deleteUser(username);
    if (!result) {
      res.status(404).send("User not found.");
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).send("Error deleting user: " + error.message);
  }
});

app.delete("/tasks/:name", async (req, res) => {
  const username = req.params["name"];
  try {
    const result = await userService.deleteUser(name);
    if (!result) {
      res.status(404).send("User not found.");
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).send("Error deleting user: " + error.message);
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});