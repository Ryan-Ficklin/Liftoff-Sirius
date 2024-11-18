import PropTypes from "prop-types";
import "./Table.css";
import { Tag } from "primereact/tag";

function TableTask(props) {
    const task = props.task;
    return (
        <div className="TableTask">
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
                <button
                    className="delete-btn"
                    onClick={() => props.removeTask(props.index)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

// Validate the props
TableTask.propTypes = {
    task: PropTypes.object.isRequired,
    index: PropTypes.any.isRequired,
    removeTask: PropTypes.func.isRequired
};

export default TableTask;
