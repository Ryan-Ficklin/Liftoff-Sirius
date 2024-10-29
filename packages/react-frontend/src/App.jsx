import React, { useState } from "react";
import Table from "./Table.jsx";

function App() {
    const [tasks, setTasks] = useState([
        {
            tname: "TE1",
            priority: "1",
            description: "Description 1",
            date: "10/28/2024"
        },
        {
            tname: "TE2",
            priority: "2",
            description: "Description 2",
            date: "10/31/2024"
        }
    ]);

    return (
        <div className ="container">
            <Table taskData={tasks} />
        </div>
    );
}
export default App;
