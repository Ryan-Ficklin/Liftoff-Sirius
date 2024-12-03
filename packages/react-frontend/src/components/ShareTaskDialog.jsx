import PropTypes from "prop-types";
import { useState } from "react";
import { Dialog } from "primereact/dialog";

function ShareTaskDialog(props) {
    // console.log(props.data);
    // const [task, setTask] = useState({
    //     name: "",
    //     id: props.data
    // });
    const [task, setTask] = useState(props.data);

    function handleChange(event) {
        console.log(event);
        const { name, value } = event.target;
        console.log(value);
        if (name) {
            setTask({
                name: value,
                id: task._id
            });
        }
    }

    function submitForm() {
        console.log(task);
        if (task.name) {
            props.handleSubmit(task.name, task.id);
            props.setShareDialogVisible(false);
            setTask({
                name: "",
                id: task._id
            });
        } else {
            props.showToast("error", "Error", "All fields must be filled in");
        }
    }

    return (
        <form>
            <Dialog
                header="Share Task"
                visible={props.shareDialogVisible}
                style={{ width: "25vw" }}
                className="create-task-dialog"
                onHide={() => {
                    if (!props.shareDialogVisible) return;
                    props.setShareDialogVisible(false);
                }}>
                <div className="dialog-content-section">
                    <p className="dialog-input-helper">Share task with user:</p>
                    <input
                        className="dialog-input"
                        placeholder="username"
                        type="text"
                        name="name"
                        id="name"
                        value={task.name}
                        onChange={handleChange}></input>

                    <button className="dialog-add-task-btn" onClick={submitForm}>
                        Share Task
                    </button>
                </div>
            </Dialog>
        </form>
    );
}

// Validate the props
ShareTaskDialog.propTypes = {
    handleSubmit: PropTypes.func.isRequired, // expects a function
    shareDialogVisible: PropTypes.bool.isRequired,
    setShareDialogVisible: PropTypes.func.isRequired,
    showToast: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

export default ShareTaskDialog;
