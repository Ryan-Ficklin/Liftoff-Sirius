// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Toast } from "primereact/toast";
import { useRef } from "react";

function App() {
    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    return (
        <PrimeReactProvider>
            <Toast ref={toast} />
            <Router>
                <Routes>
                    <Route path="/tasks" element={<TasksPage />} />
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
