import React from "react";

const AddTask = ({ inputValue, setInputValue, handleAddButton }) => {
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddButton();
    }
  };
  return (
    <div className="input-container">
      <input
        className="search-bar"
        placeholder="Task нэмэх..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="add-btn" onClick={handleAddButton}>
        Add
      </button>
    </div>
  );
};

export default AddTask;
