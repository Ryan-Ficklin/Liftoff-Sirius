// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";
import { PrimeReactProvider } from "primereact/api";

function App() {
    return (
        <PrimeReactProvider>
            <Router>
                <Routes>
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </Router>
        </PrimeReactProvider>
    );
}

export default App;
