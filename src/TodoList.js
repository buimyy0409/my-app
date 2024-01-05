import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

const TodoList = ({ tasks, toggleTaskStatus }) => {
  const today = new Date();

  const getDaysLeft = (dueDate) => {
    const dueDateTime = new Date(dueDate);
    const timeDiff = dueDateTime.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={task.done ? "task-done" : ""}
          onClick={() => toggleTaskStatus(task.id)}
        >
          {task.title} (Due in {getDaysLeft(task.dueDate)} days)
          {task.done ? (
            <FaRegCheckCircle color="#9a9a9a" className="item-done-button" />
          ) : (
            <FaRegCircle className="item-done-button" color="#9a9a9a" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
