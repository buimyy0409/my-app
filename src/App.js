import "./styles.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Form from "./Form";
import TodoList from "./TodoList";
import Header from "./TodoListHeader";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showNotFinishedOnly, setShowNotFinishedOnly] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const withDone = queryParams.get("withDone");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    setShowNotFinishedOnly(withDone === "1");
  }, [withDone]);

  const addTask = (title, dueDate) => {
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      done: false,
      dueDate,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const filteredTasks = showNotFinishedOnly
    ? tasks.filter((task) => !task.done)
    : tasks;

  const unfinishedTasksCount = tasks.filter((task) => !task.done).length;

  return (
    <div>
      <h2>Task List</h2>
      <Header unfinishedTasksCount={unfinishedTasksCount} />
      <Form addTask={addTask} />
      <TodoList tasks={filteredTasks} toggleTaskStatus={toggleTaskStatus} />
    </div>
  );
};

export default App;
