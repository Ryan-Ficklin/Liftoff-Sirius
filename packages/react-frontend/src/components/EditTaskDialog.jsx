import PropTypes from "prop-types";
import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";

function EditTaskDialog(props) {
    const [task, setTask] = useState(props.data);

    function handleChange(event) {
        console.log(event);
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
        console.log(task);
        if (task.name && task.description && task.due_date_time && task.priority) {
            props.handleSubmit(task, props.index);
            setTask({ name: "", description: "", priority: "", dueDate: "" });
        } else {
            props.showToast("error", "Error", "All fields must be filled in");
        }
    }

    return (
        <form>
            <Dialog
                header="Edit Task"
                visible={props.editDialogVisible}
                style={{ width: "25vw" }}
                className="create-task-dialog"
                onHide={() => {
                    if (!props.editDialogVisible) return;
                    props.setEditDialogVisible(false);
                }}>
                <div className="dialog-content-section">
                    <p className="dialog-input-helper">Task name</p>
                    <input
                        className="dialog-input"
                        placeholder="ie. Get TE 5 Finished"
                        type="text"
                        name="name"
                        id="name"
                        value={task.name}
                        onChange={handleChange}></input>

                    <p className="dialog-input-helper">Task Description</p>
                    <textarea
                        className="dialog-input"
                        placeholder="ie. Finish up the assignment"
                        type="text"
                        name="description"
                        cols={3}
                        id="description"
                        value={task.description}
                        onChange={handleChange}></textarea>

                    <p className="dialog-input-helper">Priority</p>
                    <input
                        className="dialog-input"
                        placeholder="ie. 1,2,3"
                        type="number"
                        name="priority"
                        id="priority"
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                        value={task.priority}
                        onChange={handleChange}></input>

                    <p className="dialog-input-helper">Due Date</p>
                    <Calendar
                        name="due_date_time"
                        value={task.due_date_time}
                        onChange={handleChange}
                        className="calendar-input"
                    />

                    <button className="dialog-add-task-btn" onClick={submitForm}>
                        Update Task
                    </button>
                </div>
            </Dialog>
        </form>
    );
}

// Validate the props
EditTaskDialog.propTypes = {
    handleSubmit: PropTypes.func.isRequired, // expects a function
    data: PropTypes.object.isRequired,
    index: PropTypes.any.isRequired,
    editDialogVisible: PropTypes.bool.isRequired,
    setEditDialogVisible: PropTypes.func.isRequired,
    showToast: PropTypes.func.isRequired
};

export default EditTaskDialog;
