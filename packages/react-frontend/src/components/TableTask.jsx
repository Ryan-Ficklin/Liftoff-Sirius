import PropTypes from "prop-types";
import { useState } from "react";
import "./Table.css";
import { Tag } from "primereact/tag";
import EditTaskDialog from "./EditTaskDialog";

function TableTask(props) {
    const task = props.task;
    const [editDialogVisible, setEditDialogVisible] = useState(false);

    return (
        <div className="TableTask">
            <EditTaskDialog
                handleSubmit={props.editEntry}
                data={task}
                index={props.index}
                editDialogVisible={editDialogVisible}
                setEditDialogVisible={setEditDialogVisible}
                showToast={props.showToast}
            />
            <div className="d-flex justify-content-between">
                <div className="task-name">{task.name}</div>
                <Tag severity="warning" className="tag">
                    Priority {task.priority}
                </Tag>
            </div>
            <p className="description">{task.description}</p>
            <div className="d-flex justify-content-between">
                <Tag className="date-tag" icon="pi pi-calendar">
                    {new Date(task.due_date_time).toLocaleDateString("en-US")}
                </Tag>

                <div className="d-flex align-items-center">
                    <i className="icon pi pi-pen-to-square" onClick={() => setEditDialogVisible(true)}></i>
                    <i className="trash-icon icon pi pi-trash" onClick={() => props.removeTask(props.index)}></i>
                </div>
            </div>
        </div>
    );
}

// Validate the props
TableTask.propTypes = {
    task: PropTypes.object.isRequired,
    index: PropTypes.any.isRequired,
    editEntry: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    showToast: PropTypes.func.isRequired
};

export default TableTask;
