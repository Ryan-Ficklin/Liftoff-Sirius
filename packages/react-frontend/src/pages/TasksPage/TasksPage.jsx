import { useEffect, useState } from "react";
import Table from "../../components/Table.jsx";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./TasksPage.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import logo from "../../assets/sirius-logo.svg";
import ToggleButton from "../../components/ToggleButton.jsx";
import no_tasks_img from "../../assets/no_tasks.svg";
import AddTaskDialog from "../../components/AddTaskDialog.jsx";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";

function TasksPage({ addAuthHeader, showToast }) {
    let navigate = useNavigate();
    const options = ["list-view", "calendar-view"];
    const [value, setValue] = useState(options[0]);
    const [createDialogVisible, setCreateDialogVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState({});
    const [viewDialogPopupVisible, setViewDialogPopupVisible] = useState(false);

    useEffect(() => {
        getUserTasks();
    }, []);

    function getUserTasks() {
        fetch(
            `https://liftoff-sirius-fsefevfha8cfecgx.westus2-01.azurewebsites.net/users/${localStorage.getItem("username")}/tasks`,
            {
                method: "GET",
                headers: addAuthHeader({
                    "Content-Type": "application/json" // Specify JSON format
                })
            }
        )
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
                    setTasks(sortTasks(list));
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
            fetch(
                "https://liftoff-sirius-fsefevfha8cfecgx.westus2-01.azurewebsites.net/checkAuth",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json" // Specify JSON format
                    },
                    body: JSON.stringify({ authorization: `Bearer ${token}` })
                }
            ).then((res) => {
                console.log(res);
                if (res.status != 200) {
                    navigate("/login");
                }
            });
        }
    }

    function removeOneTask(index) {
        /*const updated = tasks.filter((task, i) => {
            return i !== index;
        });*/
        /*setTasks(updated);*/

        console.log(tasks);
        console.log(index);
        const task = tasks[index];
        console.log(task);

        fetch(
            `https://liftoff-sirius-fsefevfha8cfecgx.westus2-01.azurewebsites.net/tasks/${task["_id"]}`,
            {
                method: "DELETE",
                headers: addAuthHeader({
                    "Content-Type": "application/json", // Specify JSON format
                    user: localStorage.getItem("username")
                }),
                body: JSON.stringify(task)
            }
        ).then((res) => {
            console.log(res);
            if (res.status == 204) {
                /*setTasks([...tasks, task]);*/
                getUserTasks();
                setCreateDialogVisible(false);
            } else {
                showToast("error", "Error", "Failed to remove task");
            }
        });
        getUserTasks();
    }

    // call this inside setTasks to always keep the tasklist sorted
    // I think a priority queue would do this job better, but that is a
    // hassle with json, and this is ultimately not very expensive
    function sortTasks(taskList) {
        taskList.sort((a, b) => {
            if (a.priority === b.priority) {
                if (a.due_date_time > b.due_date_time) {
                    return 1;
                } else {
                    return -1;
                }
            } else if (a.priority > b.priority) {
                return -1;
            } else {
                return 1;
            }
        });
        return taskList;
    }

    function updateList(task) {
        console.log(task);
        fetch(
            `https://liftoff-sirius-fsefevfha8cfecgx.westus2-01.azurewebsites.net/tasks`,
            {
                method: "POST",
                headers: addAuthHeader({
                    "Content-Type": "application/json", // Specify JSON format
                    user: localStorage.getItem("username")
                }),
                body: JSON.stringify(task)
            }
        ).then((res) => {
            console.log(res);
            if (res.status == 201) {
                /*setTasks([...tasks, task]);*/
                getUserTasks();
                setCreateDialogVisible(false);
            } else {
                showToast("error", "Error", "Failed to add task");
            }
        });
    }

    function shareTask(otherUsername, id) {
        //const task = tasks[index];
        console.log(id);
        console.log(otherUsername);
        fetch(
            `https://liftoff-sirius-fsefevfha8cfecgx.westus2-01.azurewebsites.net/tasks/share`,
            {
                method: "POST",
                headers: addAuthHeader({
                    "Content-Type": "application/json", // Specify JSON format
                    user: localStorage.getItem("username")
                }),
                body: JSON.stringify({ task: id, username: otherUsername })
            }
        ).then((res) => {
            console.log(res);
            if (res.status === 201) {
                showToast("success", "Success", "Task shared!")
            } else {
                showToast("error", "Error", "Failed to share task");
            }
        });
    }

    function editEntry(newtask, index) {
        console.log(newtask);
        const task = tasks[index];
        console.log(task);

        fetch(
            `https://liftoff-sirius-fsefevfha8cfecgx.westus2-01.azurewebsites.net/tasks/${task["_id"]}`,
            {
                method: "PUT",
                headers: addAuthHeader({
                    "Content-Type": "application/json", // Specify JSON format
                    user: localStorage.getItem("username")
                }),
                body: JSON.stringify(newtask)
            }
        ).then((res) => {
            console.log(res);
            if (res.status == 204) {
                getUserTasks();
                setCreateDialogVisible(false);
            } else {
                showToast("error", "Error", "Failed to update task");
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
            <AddTaskDialog
                handleSubmit={updateList}
                createDialogVisible={createDialogVisible}
                setCreateDialogVisible={setCreateDialogVisible}
                showToast={showToast}
            />

            {/* <Dialog
                header="Create Task"
                visible={createDialogVisible}
                style={{ width: "25vw" }}
                className="create-task-dialog"
                onHide={() => {
                    if (!createDialogVisible) return;
                    setCreateDialogVisible(false);
                }}>
                <div className="dialog-content-section">
                    <p className="dialog-input-helper">Task name</p>
                    <input
                        className="dialog-input"
                        placeholder="ie. Get TE 5 Finished"
                        type="text"
                        name="name"
                        id="name"></input>

                    <p className="dialog-input-helper">Task Description</p>
                    <textarea
                        className="dialog-input"
                        placeholder="ie. Finish up the assignment"
                        type="text"
                        name="description"
                        cols={3}
                        id="description"></textarea>

                    <p className="dialog-input-helper">Priority</p>
                    <input
                        className="dialog-input"
                        placeholder="ie. 1,2,3"
                        type="number"
                        name="priority"
                        id="priority"
                        style={{ fontWeight: "bold", fontSize: "15px" }}></input>

                    <p className="dialog-input-helper">Due Date</p>
                    <Calendar value={dueDate} onChange={(e) => setDueDate(e.value)} className="calendar-input"/>

                        <button className="dialog-add-task-btn">Add Task</button>

                </div>
            </Dialog> */}

            <div className="d-flex justify-content-between select">
                <img src={logo} className="logo"></img>

                <div className="d-flex">
                    <h2 className="title">My Tasks</h2>
                    <button
                        className="add-btn"
                        onClick={() => setCreateDialogVisible(true)}>
                        <i className="pi pi-plus" style={{ color: "white" }}></i>
                    </button>
                </div>
                <button
                    className="logout-btn"
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}>
                    Logout
                </button>
                <div className="toggle">
                    <ToggleButton onToggle={handleToggle} />
                </div>
            </div>

            {value == options[0] ? (
                /* List View Section */
                <section>
                    {tasks.length != 0 ? (
                        <div>
                            <Table
                                taskData={tasks}
                                shareTask={shareTask}
                                editEntry={editEntry}
                                removeTask={removeOneTask}
                                showToast={showToast}
                            />
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
                                    <button
                                        className="create-task-btn"
                                        onClick={() => setCreateDialogVisible(true)}>
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
                        <Dialog
                            visible={viewDialogPopupVisible}
                            closable={true}
                            draggable={false}
                            header="View Task"
                            style={{ width: "fit-content" }}
                            className="create-task-dialog"
                            onHide={() => {
                                setViewDialogPopupVisible(false);
                            }}>
                            <div className="d-flex justify-content-between">
                                <div className="task-name">{selectedTask.name}</div>
                            </div>

                            <p className="description">{selectedTask.description}</p>

                            <div className="d-flex">
                                <Tag className="date-tag" icon="pi pi-calendar">
                                    {new Date(
                                        selectedTask.due_date_time
                                    ).toLocaleDateString("en-US")}
                                </Tag>
                                <div style={{ width: "1rem" }}></div>
                                <Tag severity="warning" className="tag">
                                    Priority {selectedTask.priority}
                                </Tag>
                            </div>
                        </Dialog>

                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            eventClick={(arg) => {
                                const selected = tasks.find(
                                    (x) => x._id === arg.event.id
                                );
                                setSelectedTask(selected);
                                setViewDialogPopupVisible(true);
                                console.log(selected);
                                //console.log(arg.event.id)
                            }}
                            events={
                                tasks.map((x) => ({
                                    title: x.name,
                                    date: x.due_date_time.split("T")[0],
                                    id: x._id
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
