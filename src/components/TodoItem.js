// TodoItem.js
import React from "react";

const TodoItem = ({
  todoItem,
  handleBoxChange,
  handleDeleteTask,
  selectedTaskId,
  setSelectedTaskId,
}) => {
  return (
    <div
      key={todoItem.id}
      className={`todo-item ${
        todoItem.id === selectedTaskId ? "selected" : ""
      }`}
      onClick={() => setSelectedTaskId(todoItem.id)}
    >
      <input
        type="checkbox"
        checked={todoItem.status === "DONE"}
        onChange={() => handleBoxChange(todoItem.id)}
      />
      <span
        style={{
          textDecoration: todoItem.status === "DONE" ? "line-through" : "",
        }}
      >
        {todoItem.text}
      </span>

      <button
        className="delete-btn-1"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteTask(todoItem.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
