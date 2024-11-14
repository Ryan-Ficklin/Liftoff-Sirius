import React, { useState } from "react";

function Form(props) {
    const [task, setTask] = useState({
        tname: "",
        description: "",
        priority: "",
        dueDate: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case "tname":
                setTask({
                    tname: value,
                    description: task["description"],
                    priority: task["priority"],
                    dueDate: task["dueDate"]
                });
                break;
            case "description":
                setTask({
                    tname: task["tname"],
                    description: value,
                    priority: task["priority"],
                    dueDate: task["dueDate"]
                });
                break;
            case "priority":
                setTask({
                    tname: task["tname"],
                    description: task["description"],
                    priority: value,
                    dueDate: task["dueDate"]
                });
                break;
            case "dueDate":
                setTask({
                    tname: task["tname"],
                    description: task["description"],
                    priority: task["priority"],
                    dueDate: value
                });
                break;
        }
    }

    function submitForm() {
        props.handleSubmit(task);
        setTask({ tname: "", description: "", priority: "", dueDate: "" });
    }

    return (
        <form>
            <div className="TaskForm">
                <label htmlFor="tname">Task</label>
                <input
                    type="text"
                    name="tname"
                    id="tname"
                    value={task.tname}
                    onChange={handleChange}
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    value={task.description}
                    onChange={handleChange}
                />
                <label htmlFor="priority">Priority</label>
                <input
                    type="text"
                    name="priority"
                    id="priority"
                    value={task.priority}
                    onChange={handleChange}
                />
                <label htmlFor="dueDate">Due Date</label>
                <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                />
                <input type="button" value="Submit" onClick={submitForm} />
            </div>
        </form>
    );
}

export default Form;
