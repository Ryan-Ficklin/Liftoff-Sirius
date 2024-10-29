import React from "react";

function TableTask(props){
    const task = props.task;
    return(
        <div className = "TableTask">
            <div className = "TableTaskTop">
                <div>{task.tname}</div>
                <div id = "TableTaskTopDate">{task.date}</div>
                <div id = "TableTaskTopPriority">{task.priority}</div>
            </div>
            <p>{task.description}</p>
            <button className = "TableTaskButton"> View </button>
         </div>
    );
}

export default TableTask;
