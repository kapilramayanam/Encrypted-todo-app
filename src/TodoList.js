import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [shareTaskId, setShareTaskId] = useState(null);
  const [shareEmail, setShareEmail] = useState('');

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    const task = { id: Date.now(), text: newTask, completed: false, sharedWith: [] };
    const response = await fetch(`http://localhost:5000/create}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',},
      body: JSON.stringify({task}),
      });
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleShareTask = () => {
    if (!shareEmail.trim()) return;
    setTasks(
      tasks.map((task) =>
        task.id === shareTaskId
          ? { ...task, sharedWith: [...task.sharedWith, shareEmail] }
          : task
      )
    );
    setShareTaskId(null);
    setShareEmail('');
  };

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span
              onClick={() => handleToggleComplete(task.id)}
              style={{ cursor: 'pointer', flex: 1 }}
            >
              {task.text}
            </span>
            <div className="task-buttons">
              <button
                className="complete-btn"
                onClick={() => handleToggleComplete(task.id)}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
              <button
                className="share-btn"
                onClick={() => setShareTaskId(task.id)}
              >
                Share
              </button>
            </div>
            {task.sharedWith.length > 0 && (
              <div className="shared-with">
                <strong>Shared with:</strong> {task.sharedWith.join(', ')}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Share Modal */}
      {shareTaskId && (
        <div className="share-modal">
          <h3>Share Task</h3>
          <input
            type="email"
            placeholder="Enter email ID"
            value={shareEmail}
            onChange={(e) => setShareEmail(e.target.value)}
          />
          <div className="modal-buttons">
            <button onClick={handleShareTask}>Share</button>
            <button onClick={() => setShareTaskId(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
