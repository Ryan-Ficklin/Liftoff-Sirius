import { useState } from 'react';
import './ToggleButton.css';
import PropTypes from 'prop-types';

function ToggleButton({ option1 = "One-Way", option2 = "Return", onToggle }) {
  const [selectedOption, setSelectedOption] = useState(option1);

  const handleToggle = (option) => {
    setSelectedOption(option);
    if (onToggle) {
      onToggle(option);
    }
  };

  return (
    <div className="toggle-button">
      <div
        className={`slider ${selectedOption === option2 ? "right" : "left"}`}
      ></div>
      <button
        className={`toggle-option ${selectedOption === option1 ? "active" : ""}`}
        onClick={() => handleToggle(option1)}
      >
        {option1}
      </button>
      <button
        className={`toggle-option ${selectedOption === option2 ? "active" : ""}`}
        onClick={() => handleToggle(option2)}
      >
        {option2}
      </button>
    </div>
  );
}

// Validate the props
ToggleButton.propTypes = {
  option1: PropTypes.any.isRequired,
  option2: PropTypes.any.isRequired,
  onToggle: PropTypes.func.isRequired

};

export default ToggleButton;
