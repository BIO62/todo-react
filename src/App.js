import "./App.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

function App() {
  const [todo, setTodo] = useState([]);
  const [completedCount, setCompletedCount] = useState(0); // Track completed tasks count
  const [filterState, setFilterState] = useState("ALL");
  const [inputValue, setInputValue] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const [log, setLog] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddButton = () => {
    if (inputValue.length === 0) {
      alert("Одоогоор ажил алга. Нэгийг нэмнэ үү!");
      return;
    } else {
      const createdAt = moment();

      const newTask = {
        text: inputValue,
        id: uuidv4(),
        status: "ACTIVE",
        createdAt: createdAt, // object uusgesen tsag
        completedAt: null,
      };

      setTodo([{ ...newTask }, ...todo]);
      setLog((prevLog) => [
        ...prevLog,
        `Hэмсэн: ${newTask.text} hezee ${createdAt.format("MM/DD HH:mm:ss")}`, // tsag
      ]);
      setInputValue("");
      setDeleteButtonVisible(true);
    }
  };

  const handleBoxChange = (id) => {
    const updatedTodo = todo.map((todoItem) => {
      if (todoItem.id === id) {
        const updatedStatus = todoItem.status === "ACTIVE" ? "DONE" : "ACTIVE";
        const updatedCompletedAt = updatedStatus === "DONE" ? moment().toObject() : null; 
        // log deerh task nemeh uyd
        setLog((prevLog) => [
          ...prevLog,
          `${updatedStatus} ruu orson: ${
            todoItem.text
          } hezee ${moment().format("MM/DD HH:mm:ss")}`, 
        ]);

        return {
          ...todoItem,
          status: updatedStatus,
          completedAt: updatedCompletedAt,
        };
      }
      return todoItem;
    });

    setTodo(updatedTodo);
    const newCompletedCount = updatedTodo.filter(
      (task) => task.status === "DONE"
    ).length;
    setCompletedCount(newCompletedCount);
  };

  const handleDeleteTask = (id) => {
    const updatedTodo = todo.filter((todoItem) => todoItem.id !== id);
    setTodo(updatedTodo);
    const newCompletedCount = updatedTodo.filter(
      (task) => task.status === "DONE"
    ).length;
    setCompletedCount(newCompletedCount);

    if (updatedTodo.length === 0) {
      setDeleteButtonVisible(false);
    }
// log deerh task delete hiih uyd
    setLog((prevLog) => [
      ...prevLog,
      `Task deleted: ${moment().format("MM/DD HH:mm:ss")}`, 
    ]);
  };

  const handleDeleteAll = () => {
    const updatedTodo = todo.filter((todoItem) => todoItem.status !== "DONE");
    setTodo(updatedTodo);

    const newCompletedCount = updatedTodo.filter(
      (task) => task.status === "DONE"
    ).length;
    setCompletedCount(newCompletedCount);

    if (updatedTodo.length === 0) {
      setDeleteButtonVisible(false);
    }

    // log deerh task clear 
    setLog((prevLog) => [
      ...prevLog,
      `Tasks cleared ${moment().format("MM/DD HH:mm:ss")}`, 
    ]);
  };

  const handleFilterState = (state) => {
    setFilterState(state);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddButton();
    }
  };

  return (
    <div className="App">
      <div className="todo-container">
        <div className="todo-name">To-Do List</div>

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

        <div id="btns">
          <div
            className={`all-btn ${filterState === "ALL" ? "selected" : ""}`}
            onClick={() => handleFilterState("ALL")}
          >
            All
          </div>
          <div
            className={`active-btn ${
              filterState === "ACTIVE" ? "selected" : ""
            }`}
            onClick={() => handleFilterState("ACTIVE")}
          >
            Active
          </div>
          <div
            className={`comp-btn ${filterState === "DONE" ? "selected" : ""}`}
            onClick={() => handleFilterState("DONE")}
          >
            Completed
          </div>
          <div
            className={`log-btn ${filterState === "LOG" ? "selected" : ""}`}
            onClick={() => handleFilterState("LOG")}
          >
            #LOG
          </div>
        </div>

        {todo.length === 0 && (
          <>
            <span className="text">Одоогоор ажил алга. Нэгийг нэмнэ үү!</span>
            <span className="powered">
              Powered by{" "}
              <a href="https://facebook.com/" target="_blank" rel="noreferrer">
                ODKOSHKA
              </a>
            </span>
          </>
        )}

        {todo
          .filter((todoItem) => {
            if (filterState === "ALL") return true;
            return todoItem.status === filterState;
          })
          .map((todoItem) => (
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
                  textDecoration:
                    todoItem.status === "DONE" ? "line-through" : "",
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
          ))}

        {deleteButtonVisible && (
          <div className="footer">
            <div className="tasks-completed">
              {completedCount} of {todo.length} tasks completed
            </div>
            <div className="delete-btn" onClick={handleDeleteAll}>
              Clear Completed
            </div>
          </div>
        )}

        {filterState === "LOG" && (
          <div className="log-container">
            <h3>LOG</h3>
            <ul>
              {log.map((logEntry, index) => (
                <li key={index}>{logEntry}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
