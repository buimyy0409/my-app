import { useState, useEffect } from "react";

const Form = ({ addTask }) => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      addTask(task, dueDate);
      setTask("");
      setDueDate("");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Enter task ..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

const TaskList = ({ tasks, toggleTaskStatus }) => {
  const [showOnlyNotFinished, setShowOnlyNotFinished] = useState(false);

  const handleToggleShowOnlyNotFinished = () => {
    setShowOnlyNotFinished(!showOnlyNotFinished);
  };

  const filteredTasks = showOnlyNotFinished
    ? tasks.filter((task) => !task.done)
    : tasks;

  const getDaysUntilDueDate = (dueDate) => {
    const today = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDiff = dueDateObj.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showOnlyNotFinished}
          onChange={handleToggleShowOnlyNotFinished}
        />
        Not finished only
      </label>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTaskStatus(task.id)}
            />
            {task.title}
            {task.dueDate && (
              <span> - Due in {getDaysUntilDueDate(task.dueDate)} days</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            done: !task.done,
          };
        }
        return task;
      });
    });
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <Form addTask={addTask} />
      <p>
        Total number of unfinished tasks:{" "}
        {tasks.filter((task) => !task.done).length}
      </p>
      <TaskList tasks={tasks} toggleTaskStatus={toggleTaskStatus} />
    </div>
  );
};

export default App;
