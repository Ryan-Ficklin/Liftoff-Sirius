// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TasksPage from "./pages/TasksPage/TasksPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Toast } from "primereact/toast";
import { useRef } from "react";

function App() {
    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    function addAuthHeader(otherHeaders = {}) {
        const token = localStorage.getItem("token");
        if (!token) {
            return otherHeaders;
        } else {
            return {
                ...otherHeaders,
                Authorization: `Bearer ${token}`
            };
        }
    }

    return (
        <PrimeReactProvider>
            <Toast ref={toast} />
            <Router>
                <Routes>
                    <Route
                        path="/tasks"
                        element={<TasksPage addAuthHeader={addAuthHeader} />}
                    />
                    <Route path="/login" element={<LoginPage showToast={showToast} />} />
                    <Route
                        path="/signup"
                        element={<SignUpPage showToast={showToast} />}
                    />
                </Routes>
            </Router>
        </PrimeReactProvider>
    );
}

export default App;
