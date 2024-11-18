import PropTypes from "prop-types";

function TableTask(props) {
    const task = props.task;
    return (
        <div className="TableTask">
            <div className="TableTaskTop">
                <div>{task.tname}</div>
                <div id="TableTaskTopDate">{task.dueDate}</div>
                <div id="TableTaskTopPriority">{task.priority}</div>
            </div>
            <p id="TableTaskDescription">{task.description}</p>
            <button
                className="TableTaskButton"
                onClick={() => props.removeTask(props.index)}>
                Delete
            </button>
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
