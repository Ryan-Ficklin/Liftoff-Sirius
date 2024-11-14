import logo from "../../assets/sirius-logo.svg";
import "./LoginPage.css";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function LoginPage({ showToast }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [btnEnabled, setBtnEnabled] = useState(true);
    const navigate = useNavigate();

    function login() {
        setBtnEnabled(false);
        if (username !== "" && password !== "") {
            // User object
            let user = {
                username: username,
                password: password
            };
            console.log("works");

            // Backend call
            fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // Specify JSON format
                },
                body: JSON.stringify(user)
            })
                .then((res) => {
                    console.log(res);
                    if (res.status != 200) {
                        showToast("error", "Error", "Login credentials invalid");
                        return undefined;
                    } else {
                        return res.json();
                    }
                })
                .then((data) => {
                    setBtnEnabled(true);
                    if (data) {
                        console.log(data);
                        let token = data["token"];
                        localStorage.setItem("token", token);
                        navigate("/tasks");
                    }
                })
                .catch((error) => {
                    setBtnEnabled(true);
                    showToast("error", "Error", "Failed: " + error);
                    console.log(error);
                });
        } else {
            setBtnEnabled(true);
            showToast("warn", "Error", "One or more fields are left blank");
        }
    }

    return (
        <div className="body">
            <div className="d-flex justify-content-center login-section">
                <div>
                    <center>
                        <img src={logo} className="img" />
                    </center>
                    <div className="card">
                        <center>
                            <h4 className="login-tag">Login</h4>
                        </center>

                        {/* Username Input */}
                        <p className="label">Username</p>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input"
                        />

                        {/* Password Input */}

                        <p className="label">Password</p>
                        <InputText
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            type="password"
                        />

                        <a href="/signup">
                            <p className="signup">Don&apos;t have an account? Sign up</p>
                        </a>

                        <button
                            className="login-btn"
                            onClick={login}
                            disabled={!btnEnabled}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Validate the props
LoginPage.propTypes = {
    showToast: PropTypes.func.isRequired // expects a function
};
export default LoginPage;
