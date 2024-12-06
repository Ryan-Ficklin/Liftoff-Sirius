// backend.js
import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import mongoose from "mongoose";

import userService from "./services/user-service.js";
import taskService from "./services/task-service.js";
import eventService from "./services/event-service.js";
import auth, { authenticateUser } from "./auth.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
if (mongoose.connection.readyState === 0) {
    mongoose.connect(MONGO_CONNECTION_STRING).catch((error) => console.log(error));
} else {
    console.log("Already connected to MongoDB");
}

const app = express();
const port = 8000;

const addUser = (user) => {
    const NewUser = { ...user };
    users["users_list"].push(NewUser);
    return NewUser;
};

const addTask = (task) => {
    const NewTask = { ...task };
    tasks["tasks_list"].push(NewTask);
    return NewTask;
};

const generateID = () => {
    return Math.random().toString(36).substr(2, 6);
};

app.use(cors());
app.use(express.json());

app.get("/users", authenticateUser, async (req, res) => {
    const username = req.query.username;
    const email = req.query.email;
    try {
        const users = await userService.getUsers(username, email);
        res.status(200).json({ users_list: users });
    } catch (error) {
        res.status(500).send("Error fetching users: " + error.message);
    }
});

app.get("/tasks", authenticateUser, async (req, res) => {
    const name = req.query.name;
    const description = req.query.description;
    const due_date_time = req.query.due_date_time;
    const priority = req.query.priority;
    try {
        const tasks = await taskService.getTasks(
            name,
            description,
            due_date_time,
            priority
        );
        res.status(200).json({ tasks_list: tasks });
    } catch (error) {
        res.status(500).send("Error fetching tasks: " + error.message);
    }
});

app.get("/users/:username/tasks", authenticateUser, async (req, res) => {
    const username = req.params["username"];
    try {
        const user = await userService.getUsers(username);
        console.log(user);
        if (user) {
            console.log(user.task_list);
            const tasks = await taskService.findTasksByIDList(user.task_list);
            res.status(200).json({ task_list: tasks });
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(500).send("Error fetching users: " + error.message);
    }
});

app.get("/events", authenticateUser, async (req, res) => {
    const name = req.query.name;
    const description = req.query.description;
    const due_date_time = req.query.due_date_time;
    const priority = req.query.priority;
    try {
        const events = await eventService.getEvents(
            name,
            description,
            due_date_time,
            priority
        );
        res.status(200).json({ events_list: events });
    } catch (error) {
        res.status(500).send("Error fetching events: " + error.message);
    }
});

app.get("/tasks/:id", authenticateUser, async (req, res) => {
    const id = req.params["id"];
    try {
        const result = await taskService.findTaskByID(id);
        if (!result) {
            res.status(404).send("Resource not found.");
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).send("Error fetching task: " + error.message);
    }
});

app.get("/events/:id", authenticateUser, async (req, res) => {
    const id = req.params["id"];
    try {
        const result = await eventService.findEventByID(id);
        if (!result) {
            res.status(404).send("Resource not found.");
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).send("Error fetching event: " + error.message);
    }
});

app.post("/users", auth.authenticateUser, async (req, res) => {
    const userToAdd = req.body;
    try {
        const addedUser = await userService.addUser(userToAdd);
        res.status(201).json(addedUser);
    } catch (error) {
        res.status(500).send("Error adding user: " + error.message);
    }
});

app.post("/signup", auth.registerUser);

app.post("/login", auth.loginUser);

app.post("/checkAuth", async (req, res) => {
    auth.authenticateUser(req, res, () => {
        res.status(200).send();
    });
});

app.post("/tasks", authenticateUser, async (req, res) => {
    const taskToAdd = req.body;
    const user = req.headers["user"];
    if (user) {
        const userObj = await userService.getUsers(user);
        if (userObj) {
            try {
                const addedTask = await taskService.addTask(taskToAdd, userObj);
                res.status(201).json(addedTask);
            } catch (error) {
                res.status(500).send("Error adding task: " + error.message);
            }
        } else {
            res.status(404).json("User doesn't exist");
        }
    } else {
        res.status(404).send("User not found, include 'user' header");
    }
});

app.post("/tasks/share", authenticateUser, async (req, res) => {
    const task = req.body["task"];
    const username = req.body["username"];
    console.log(task);
    console.log(username);
    if (!username) {
        res.status(404).send("User not found, include valid username");
    } else if (!task) {
        res.status(404).send("Task not found, include task ID");
    } else {
        const ret = await userService.addTaskIDToUser(username, task);
        res.status(201).json(ret);
    }
});

app.post("/events", authenticateUser, async (req, res) => {
    const eventToAdd = req.body;
    // const addedEvent = addEvent(eventToAdd);
    try {
        const addedEvent = await eventService.addEvent(eventToAdd);
        res.status(201).json(addedEvent);
    } catch (error) {
        res.status(500).send("Error adding event: " + error.message);
    }
});

app.delete("/users/:username", authenticateUser, async (req, res) => {
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

app.delete("/tasks/:id", authenticateUser, async (req, res) => {
    const id = req.params["id"];
    const user = req.headers["user"];
    if (id && user) {
        const userObj = await userService.getUsers(user);
        if (userObj) {
            try {
                const result = await taskService.deleteTask(id, userObj);
                if (!result) {
                    res.status(404).send("Task not found.");
                } else {
                    res.sendStatus(204);
                }
            } catch (error) {
                res.status(500).send("Error deleting task: " + error.message);
            }
        } else {
            res.status(404).send("User not found");
        }
    } else {
        res.status(404).send("Header 'user' and param 'id' must be given");
    }
});

app.delete("/events/:id", authenticateUser, async (req, res) => {
    const id = req.params["id"];
    try {
        const result = await eventService.deleteEvent(id);
        if (!result) {
            res.status(404).send("Event not found.");
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        res.status(500).send("Error deleting event: " + error.message);
    }
});

app.put("/tasks/:id", authenticateUser, async (req, res) => {
    const taskToPut = req.body;

    const id = req.params["id"];
    const user = req.headers["user"];
    if (id && user) {
        const userObj = await userService.getUsers(user);
        if (userObj) {
            try {
                const result = await taskService.updateTask(id, taskToPut);
                if (!result) {
                    res.status(404).send("Task not found.");
                } else {
                    res.sendStatus(204);
                }
            } catch (error) {
                res.status(500).send("Error updating task: " + error.message);
            }
        } else {
            res.status(404).send("User not found");
        }
    } else {
        res.status(404).send("Header 'user' and param 'id' must be given");
    }
});

//Calendar
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

app.listen(process.env.PORT || port, () => {
    console.log("Rest API is listening");
});
