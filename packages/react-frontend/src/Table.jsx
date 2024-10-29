import React from "react";
import TableTask from "./TableTask.jsx";

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
                <TableTask task={row}/>
            </div>
        );
    });
    return (
        <div>
            {tasks}
        </div>
    );
}

function Table(props){
    return(
        <table className = "TaskTable">
            <TableHeader />
            <TableBody taskData={props.taskData} />
        </table>
    );
}

export default Table;
