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
                header="Header"
                visible={createDialogVisible}
                style={{ width: "50vw" }}
                onHide={() => {
                    if (!createDialogVisible) return;
                    setCreateDialogVisible(false);
                }}>
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
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
