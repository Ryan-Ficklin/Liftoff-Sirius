import { useEffect, useState } from "react";
import Table from "../Table.jsx";
import Form from "../Form.jsx";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { SelectButton } from "primereact/selectbutton";
import "../TasksPage.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

function TasksPage({ addAuthHeader }) {
    let navigate = useNavigate();
    const options = ["List View", "Calendar View"];
    const [value, setValue] = useState(options[0]);

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

    function checkUserAuth() {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            fetch("http://localhost:8000/checkAuth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // Specify JSON format
                },
                body: JSON.stringify({ authorization: `Bearer ${token}` })
            }).then((res) => {
                console.log(res);
                if (res.status != 200) {
                    navigate("/login");
                }
            });
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
    });

    return (
        <div className="container">
            <div className="d-flex justify-content-end select">
                <SelectButton
                    value={value}
                    onChange={(e) => setValue(e.value)}
                    options={options}
                />
            </div>

            {value == options[0] ? (
                /* List View Section */
                <section>
                    <Table taskData={tasks} removeTask={removeOneTask} />
                    <Form handleSubmit={updateList} />
                </section>
            ) : (
                /* Calendar View Section */
                <section className="select">
                    <div>
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            events={[
                                { title: 'Turn in TE 1 helloooooooooo', date: '2024-11-12', start: new Date('2024-11-12 20:00:00'), end: new Date('2024-11-13 01:00:00') },
                                { title: 'event 2 turn in teeeeeee', date: '2024-11-13', start: new Date('2024-11-13 10:00:00')}
                              ]}
                        />
                    </div>
                </section>
            )}
        </div>
    );
}

// Validate the props
TasksPage.propTypes = {
    addAuthHeader: PropTypes.func.isRequired // expects a function
};

export default TasksPage;
