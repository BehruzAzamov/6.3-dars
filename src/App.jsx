import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleCheck,
  faEdit,
  faSave,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import "./index.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (taskInput.trim() !== "") {
      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = taskInput;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, taskInput]);
      }
      setTaskInput("");
    } else {
      alert("Please enter a task.");
    }
  };

  const editTask = (index) => {
    setTaskInput(tasks[index]);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setEditIndex(null);
  };

  return (
    <div className="todo-container">
      <h1>
        <FontAwesomeIcon icon={faCircleCheck} />
        Todo List
      </h1>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={addTask}>
        {editIndex !== null ? "Update Task" : "+Add"}
      </button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {index === editIndex ? (
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />
            ) : (
              task
            )}
            <div>
              {index === editIndex ? (
                <FontAwesomeIcon icon={faSave} onClick={addTask} />
              ) : (
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => editTask(index)}
                />
              )}
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => deleteTask(index)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
