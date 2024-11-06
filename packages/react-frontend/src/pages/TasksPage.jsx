import { useEffect, useState } from "react";
import Table from "../Table.jsx";
import Form from "../Form.jsx";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function TasksPage({addAuthHeader}) {
    let navigate = useNavigate();
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

    function checkUserAuth(){
        const token = localStorage.getItem("token");  
        if(!token){
            navigate("/login")
        } else {
            fetch("http://localhost:8000/checkAuth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // Specify JSON format
                },
                body: JSON.stringify({"authorization": `Bearer ${token}`})
            })
                .then((res) => {
                    console.log(res);
                    if (res.status != 200) {
                        navigate("/login")
                    }
                })
        }
    }

    function removeOneTask(index) {
        const updated = tasks.filter((task, i) => {
            return i !== index;
        });
        setTasks(updated);
    }

    function updateList(task) {
        setTasks([...tasks, task]);
    }

    useEffect(() => {
        checkUserAuth();
    })

    return (
        <div className="container">
            <Table taskData={tasks} removeTask={removeOneTask} />
            <Form handleSubmit={updateList} />
        </div>
    );
}

// Validate the props
TasksPage.propTypes = {
    addAuthHeader: PropTypes.func.isRequired // expects a function
};

export default TasksPage;
