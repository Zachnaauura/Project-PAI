import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddTask = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    isCompleted: false,
    dateAdded: new Date().toISOString(),
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setNewTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleAddTask = () => {
    onAddTask(newTask);
    setNewTask({
      title: '',
      description: '',
      isCompleted: false,
      dateAdded: new Date().toISOString(),
    });
  };

  return (
    <div>
      <h2>Dodaj nowe zadanie</h2>
      <form>
        <label>
          Tytuł:
          <input type="text" name="title" value={newTask.title} onChange={handleChange} />
        </label>
        <label>
          Opis:
          <textarea name="description" value={newTask.description} onChange={handleChange} />
        </label>
        <button type="button" onClick={handleAddTask}>
          Dodaj zadanie
        </button>
      </form>
      <Link to="/">Powrót do listy zadań</Link>
    </div>
  );
};

export default AddTask;
