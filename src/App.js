import "./App.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Filter from "./components/Filtertodo";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import TodoItem from "./components/TodoItem";
import FooterHidden from "./components/Footerhidden";

function App() {
  const [todo, setTodo] = useState([]);
  const [completedCount, setCompletedCount] = useState(0); // Track completed tasks count
  const [filterState, setFilterState] = useState("ALL");
  const [inputValue, setInputValue] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const [log, setLog] = useState([]);

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
        const updatedCompletedAt =
          updatedStatus === "DONE" ? moment().toObject() : null;
        // log deerh task nemeh uyd
        setLog((prevLog) => [
          ...prevLog,
          `${updatedStatus} ruu orson: ${todoItem.text} hezee ${moment().format(
            "MM/DD HH:mm:ss"
          )}`,
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

  return (
    <div className="App">
      <div className="todo-container">
        <div className="todo-name">To-Do List</div>
        <AddTask
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleAddButton={handleAddButton}
        />
        <Filter
          filterState={filterState}
          handleFilterState={handleFilterState}
        />
        <Footer todo={todo} />
        {todo.map((todoItem) => (
          <TodoItem
            key={todoItem.id}
            todoItem={todoItem}
            handleBoxChange={handleBoxChange}
            handleDeleteTask={handleDeleteTask}
            selectedTaskId={selectedTaskId}
            setSelectedTaskId={setSelectedTaskId}
          />
        ))}
        {todo.length > 0 && completedCount > 0 && (
          <Footer
            completedCount={completedCount}
            totalCount={todo.length}
            handleDeleteAll={handleDeleteAll}
          />
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
