import { useEffect, useState } from "react";
import Table from "../../components/Table.jsx";
import Form from "../../components/Form.jsx";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./TasksPage.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import logo from "../../assets/sirius-logo.svg";
import ToggleButton from "../../components/ToggleButton.jsx";
import { Dialog } from "primereact/dialog";
import no_tasks_img from "../../assets/no_tasks.svg";
import { InputText } from 'primereact/inputtext';

function TasksPage({ addAuthHeader, showToast }) {
    let navigate = useNavigate();
    const options = ["list-view", "calendar-view"];
    const [value, setValue] = useState(options[0]);
    const [createDialogVisible, setCreateDialogVisible] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getUserTasks();
    }, []);

    function getUserTasks() {
        fetch(`http://localhost:8000/users/${localStorage.getItem("username")}/tasks`, {
            method: "GET",
            headers: addAuthHeader({
                "Content-Type": "application/json" // Specify JSON format
            })
        })
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    return res.json();
                }
            })
            .then((data) => {
                let list = data["task_list"];
                console.log(list);
                if (list) {
                    console.log(list);
                    setTasks(list);
                } else {
                    showToast("error", "Error", "Failed to load tasks for user");
                }
            });
    }

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
        console.log(task);
        fetch(`http://localhost:8000/tasks`, {
            method: "POST",
            headers: addAuthHeader({
                "Content-Type": "application/json" // Specify JSON format
            }),
            body: JSON.stringify(task)
        }).then((res) => {
            console.log(res);
            if (res.status == 201) {
                setTasks([...tasks, task]);
            } else {
                showToast("error", "Error", "Failed to add task");
            }
        });
    }

    useEffect(() => {
        checkUserAuth();
    });

    const handleToggle = (isToggled) => {
        setValue(isToggled);
    };

    return (
        <div>
            <Dialog
                header="Create Task"
                visible={createDialogVisible}
                style={{ width: "fit-content" }}
                className="create-task-dialog"
                onHide={() => {
                    if (!createDialogVisible) return;
                    setCreateDialogVisible(false);
                }}>
                
                <input></input>
            </Dialog>

            <div className="d-flex justify-content-between select">
                <img src={logo} className="logo"></img>

                <div className="d-flex">
                    <h2 className="title">My Tasks</h2>
                    <button
                        className="add-btn"
                        onClick={() => setCreateDialogVisible(true)}>
                        <i className="pi pi-plus"></i>
                    </button>
                </div>

                <div className="toggle">
                    <ToggleButton onToggle={handleToggle} />
                </div>
            </div>

            {value == options[0] ? (
                /* List View Section */
                <section>
                    {tasks.length != 0 ? (
                        <div>
                            <Table taskData={tasks} removeTask={removeOneTask} />
                            <Form handleSubmit={updateList} />
                        </div>
                    ) : (
                        <div>
                            <center className="no-tasks-section">
                                <div>
                                    <img src={no_tasks_img} className="no-tasks-img" />
                                    <h2 className="no-tasks-title center">
                                        No Tasks Found
                                    </h2>
                                    <p className="center no-tasks-subhead">
                                        You don&apos;t have any tasks. Add one by clicking
                                        the + button on the top or the button below
                                    </p>
                                    <button className="create-task-btn" onClick={() => setCreateDialogVisible(true)}>
                                        Create Task
                                    </button>
                                </div>
                            </center>
                        </div>
                    )}
                </section>
            ) : (
                /* Calendar View Section */
                <section className="select">
                    <div className="container">
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            events={
                                tasks.map((x) => ({
                                    title: x.name,
                                    date: x.due_date_time.split("T")[0]
                                }))
                                /*{ title: 'Turn in TE 1 helloooooooooo', date: '2024-11-12', start: new Date('2024-11-12 20:00:00'), end: new Date('2024-11-13 01:00:00') },
                                { title: 'event 2 turn in teeeeeee', date: '2024-11-13', start: new Date('2024-11-13 10:00:00')}*/
                            }
                        />
                    </div>
                </section>
            )}
        </div>
    );
}

// Validate the props
TasksPage.propTypes = {
    addAuthHeader: PropTypes.func.isRequired, // expects a function
    showToast: PropTypes.func.isRequired
};

export default TasksPage;
