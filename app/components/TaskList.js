import React from "react";

const TaskList = ({ tasks, setTasks }) => {
  const handleSort = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorities = { high: 1, medium: 2, low: 3 };
      return priorities[a.priority] - priorities[b.priority];
    });
    setTasks(sortedTasks);
  };
  const handleToggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  return (
    <ul className="task-list">
    <button onClick={handleSort}>Sort by Priority</button>
      {sortedTasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.priority} ${
            task.completed ? "completed" : ""
          }`}
        >
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span>Priority: {task.priority}</span>
          </div>
          <div className="task-actions">
            <button onClick={() => handleToggleComplete(task.id)}>
              {task.completed ? "Mark as Pending" : "Mark as Completed"}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default TaskList;
