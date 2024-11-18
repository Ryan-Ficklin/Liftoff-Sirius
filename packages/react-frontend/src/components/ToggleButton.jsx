import { useState } from "react";
import "./ToggleButton.css";
import PropTypes from "prop-types";

function ToggleButton({ onToggle }) {
    const list_view_icon = <i key="option1" className="pi pi-bars"></i>;
    const calendar_view_icon = <i key="option2" className="pi pi-calendar"></i>;
    const calendar_view = "calendar-view";
    const list_view = "list-view";
    const [selectedOption, setSelectedOption] = useState(list_view);

    const handleToggle = (option) => {
        setSelectedOption(option);
        if (onToggle) {
            onToggle(option);
        }
    };

    return (
        <div className="toggle-button">
            <div
                className={`slider ${selectedOption === calendar_view ? "right" : "left"}`}></div>
            <button
                className={`toggle-option ${selectedOption === list_view ? "active" : ""}`}
                onClick={() => handleToggle(list_view)}>
                {list_view_icon}
            </button>
            <button
                className={`toggle-option ${selectedOption === calendar_view ? "active" : ""}`}
                onClick={() => handleToggle(calendar_view)}>
                {calendar_view_icon}
            </button>
        </div>
    );
}

// Validate the props
ToggleButton.propTypes = {
    onToggle: PropTypes.func.isRequired
};

export default ToggleButton;
