"use client";

import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import "./globals.css";



export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Complete the task for Josh Talks', priority: 'high', completed: false },
    { id: 2, title: 'Task 2', description: 'Buy groceries', priority: 'medium', completed: false },
    { id: 3, title: 'Task 3', description: 'Car Wash', priority: 'low', completed: false },

  ]);

  const [searchQuery, setSearchQuery] = useState('');


  // Add task handler
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: Date.now(), completed: false },
    ]);
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) setTasks(savedTasks);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  //  Search Filter
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div>
      <h1>Task Management App</h1>
      <input 
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Search tasks..." 
        style={{ marginBottom: '20px', padding: '10px', width: '100%', borderRadius: '5px' }}
      />
      {/* TaskForm to add a new task */}

      <TaskForm onAddTask={handleAddTask} />

      {/* TaskList to display and manage tasks */}
      <TaskList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
}
