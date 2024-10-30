import React, { useState } from "react";
import Table from "./Table.jsx";
import Form from "./Form";

function App() {
    const [tasks, setTasks] = useState([
        {
            tname: "TE1",
            priority: "1",
            description: "Description 1",
            dueDate: "10/28/2024"
        },
        {
            tname: "TE2",
            priority: "2",
            description: "Description 2",
            dueDate: "10/31/2024"
        }
    ]);
    
    function removeOneTask(index){
        const updated = tasks.filter((task, i) => {
            return i !== index;
        });
        setTasks(updated);
    }

    function updateList(task) {
        setTasks([...tasks, task]);
    }

    return (
        <div className ="container">
            <Table 
                taskData={tasks}
                removeTask={removeOneTask}
            />
            <Form handleSubmit={updateList}/>
        </div>
    );
}
export default App;
