import PropTypes from "prop-types";
import { useState } from "react";

function Form(props) {
    const [task, setTask] = useState({
        name: "",
        description: "",
        priority: "",
        due_date_time: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case "name":
                setTask({
                    name: value,
                    description: task["description"],
                    priority: task["priority"],
                    due_date_time: task["due_date_time"]
                });
                break;
            case "description":
                setTask({
                    name: task["name"],
                    description: value,
                    priority: task["priority"],
                    due_date_time: task["due_date_time"]
                });
                break;
            case "priority":
                setTask({
                    name: task["name"],
                    description: task["description"],
                    priority: value,
                    due_date_time: task["due_date_time"]
                });
                break;
            case "due_date_time":
                setTask({
                    name: task["name"],
                    description: task["description"],
                    priority: task["priority"],
                    due_date_time: value
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
                <label htmlFor="name">Task</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={task.name}
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
                <label htmlFor="due_date_time">Due Date</label>
                <input
                    type="date"
                    name="due_date_time"
                    id="due_date_time"
                    value={task.due_date_time}
                    onChange={handleChange}
                />
                <input type="button" value="Submit" onClick={submitForm} />
            </div>
        </form>
    );
}

// Validate the props
Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired, // expects a function
};


export default Form;
