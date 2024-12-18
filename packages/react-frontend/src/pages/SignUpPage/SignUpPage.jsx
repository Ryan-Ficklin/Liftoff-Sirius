import logo from "../../assets/sirius-logo.svg";
import "./SignUpPage.css";
import { InputText } from "primereact/inputtext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function LoginPage({ showToast }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [btnEnabled, setBtnEnabled] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://smtpjs.com/v3/smtp.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const sendEmail = () => {
        window.Email.send({
            SecureToken: "476bb72c-c256-4a0d-b624-0cea4d2f9147",

            To: email, //this only works if you pay for it, but can send to the registered email
            From: "sirius.noreply5@gmail.com",
            Subject: "Sirius Sign Up",
            Body: "Thanks for creating an account with Sirius!"
        })
            .then((message) => {
                console.log("Email sent response:", message);
                alert("Successful email sent");
            })
            .catch((error) => console.error("Failed email send", error));
    };

    function signup() {
        setBtnEnabled(false);
        if (username !== "" && password !== "" && email !== "") {
            // User object
            let user = {
                username: username,
                password: password,
                email: email
            };
            console.log("works");

            // Backend call
            fetch(
                "https://liftoff-sirius-fsefevfha8cfecgx.westus2-01.azurewebsites.net/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json" // Specify JSON format
                    },
                    body: JSON.stringify(user)
                }
            )
                .then((res) => {
                    console.log(res);
                    if (res.status != 201) {
                        showToast("error", "Error", "Failed");
                        return undefined;
                    } else {
                        return res.json();
                    }
                })
                .then((data) => {
                    setBtnEnabled(true);
                    console.log(data);
                    showToast(
                        "success",
                        "User created!",
                        `The user ${username} was successfully created!`
                    );
                    let token = data["token"];
                    // add new signed up user to local cache
                    // also overwrites anything in the cache right now
                    localStorage.setItem("token", token);
                    localStorage.setItem("username", username);
                    sendEmail();
                    navigate("/tasks");
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
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        signup();
                    }}>
                    <center>
                        <img src={logo} className="img" />
                    </center>
                    <div className="card">
                        <center>
                            <h4 className="login-tag">Sign Up</h4>
                        </center>

                        {/* Username Input */}
                        <p className="label">Username</p>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input"
                        />

                        {/* Email Input */}
                        <p className="label">Email</p>
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            type="email"
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

                        <a href="/login">
                            <p className="signup">Already have an account? Login</p>
                        </a>

                        <button
                            className="signup-btn"
                            onClick={signup}
                            disabled={!btnEnabled}>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Validate the props
LoginPage.propTypes = {
    showToast: PropTypes.func.isRequired // expects a function
};
export default LoginPage;
