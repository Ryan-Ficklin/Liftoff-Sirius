import TableTask from "./TableTask.jsx";
import PropTypes from "prop-types";
import "./Table.css";

function TableBody(props) {
    const tasks = props.taskData.map((row, index) => {
        return (
            <tbody key={row._id}>
                <TableTask
                    task={row}
                    editEntry={props.editEntry}
                    removeTask={props.removeTask}
                    index={index}
                    showToast={props.showToast}
                />
            </tbody>
        );
    });
    return tasks;
}

TableBody.propTypes = {
    taskData: PropTypes.array.isRequired,
    editEntry: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    showToast: PropTypes.func.isRequired
};

function Table(props) {
    return (
        <table className="TaskTable">
            <TableBody
                taskData={props.taskData}
                editEntry={props.editEntry}
                removeTask={props.removeTask}
                showToast={props.showToast}
            />
        </table>
    );
}

// Validate the props
Table.propTypes = {
    taskData: PropTypes.array.isRequired,
    editEntry: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    showToast: PropTypes.func.isRequired
};

export default Table;
