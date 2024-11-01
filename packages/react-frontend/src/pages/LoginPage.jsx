import logo from "../assets/sirius-logo.svg";
import "../LoginPage.css";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

                        <button className="login-btn">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;
