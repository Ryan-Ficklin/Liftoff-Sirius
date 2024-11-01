import logo from "../assets/sirius-logo.svg";
import "../LoginPage.css";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

function LoginPage() {
    const [username, setUsername] = useState('');
    return (
        <div className="body">
            <div className="d-flex justify-content-center login-section">
                <div>
                    <img src={logo} className="img" />
                    <div className="card">
                        <center>
                            <h4 className="login-tag">Login</h4>

                            <FloatLabel>
                                <InputText
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <label htmlFor="username">Username</label>
                            </FloatLabel>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;
