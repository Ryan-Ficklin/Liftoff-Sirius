import TableTask from "./TableTask.jsx";
import PropTypes from "prop-types";

function TableHeader() {
    return (
        <thead>
            <tr>
                <th>Tasks</th>
            </tr>
        </thead>
    );
}

function TableBody(props) {
    const tasks = props.taskData.map((row, index) => {
        return (
            <div key={index}>
                <TableTask task={row} removeTask={props.removeTask} index={index} />
            </div>
        );
    });
    return <tbody>{tasks}</tbody>;
}

TableBody.propTypes = {
    taskData: PropTypes.array.isRequired,
    removeTask: PropTypes.func.isRequired
};

function Table(props) {
    return (
        <table className="TaskTable">
            <TableHeader />
            <TableBody taskData={props.taskData} removeTask={props.removeTask} />
        </table>
    );
}

// Validate the props
Table.propTypes = {
    taskData: PropTypes.array.isRequired,
    removeTask: PropTypes.func.isRequired
};

export default Table;
