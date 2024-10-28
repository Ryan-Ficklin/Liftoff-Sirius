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

function TableBody() {
    return (
        <tbody>
            <TableTask />
            <TableTask />
        </tbody>
    );
}

function Table(){
    return(
        <table>
            <TableHeader />
            <TableBody />
        </table>
    );
}

export default Table;
