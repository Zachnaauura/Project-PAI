import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const TaskList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [tasks, setTasks] = useState([]);
  const [sortOption, setSortOption] = useState('dateAdded');
  const [filterOption, setFilterOption] = useState('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
          throw new Error(`Błąd pobierania zadań: ${response.statusText}`);
        }
        const data = await response.json();
        setTasks(data.map(task => ({ ...task, isEditing: false })));
      } catch (error) {
        console.error('Błąd pobierania zadań:', error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleEditToggle = taskId => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const handleInputChange = (taskId, field, value) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, [field]: value } : task
      )
    );
  };

  const handleSave = taskId => {
    console.log('Zapisano zmiany dla zadania o ID:', taskId);
    handleEditToggle(taskId);
  };

  const handleSortChange = event => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = event => {
    setFilterOption(event.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    if (filterOption === 'all') {
      return true;
    } else if (filterOption === 'completed') {
      return task.completed;
    } else {
      return !task.completed;
    }
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOption === 'dateAdded') {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    } else if (sortOption === 'priority') {
      return b.priority - a.priority;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Lista Zadań
      </Typography>
      <div>
        <FormControl>
          <InputLabel>Sortuj według:</InputLabel>
          <Select value={sortOption} onChange={handleSortChange}>
            <MenuItem value="dateAdded">Daty dodania</MenuItem>
            <MenuItem value="priority">Priorytetu</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Filtruj według:</InputLabel>
          <Select value={filterOption} onChange={handleFilterChange}>
            <MenuItem value="all">Wszystkie zadania</MenuItem>
            <MenuItem value="completed">Wykonane zadania</MenuItem>
            <MenuItem value="uncompleted">Niewykonane zadania</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {sortedTasks.map(task => (
          <Card
            key={task.id}
            style={{
              margin: '10px',
              width: isMobile ? '100%' : '200px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CardContent>
              {task.isEditing ? (
                <div>
                  <label>
                    Tytuł:
                    <input
                      type="text"
                      value={task.title}
                      onChange={e => handleInputChange(task.id, 'title', e.target.value)}
                    />
                  </label>
                  <label>
                    Opis:
                    <textarea
                      value={task.description}
                      onChange={e => handleInputChange(task.id, 'description', e.target.value)}
                    />
                  </label>
                  <Button variant="contained" onClick={() => handleSave(task.id)}>
                    Zapisz
                  </Button>
                </div>
              ) : (
                <div>
                  <Link to={`/details/${task.id}`}>
                    <Typography variant="h6" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {task.title}
                    </Typography>
                    <Typography style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {task.completed ? 'Wykonane' : 'Niewykonane'}
                    </Typography>
                    <Typography style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      <strong>Opis:</strong> {task.description || 'Brak opisu'}
                    </Typography>
                    <Typography style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      <strong>Data dodania:</strong> {task.dateAdded || 'Brak daty dodania'}
                    </Typography>
                  </Link>
                  <Button variant="contained" onClick={() => handleEditToggle(task.id)}>
                    Edytuj
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Link to="/add">Dodaj nowe zadanie</Link>
    </div>
  );
};

export default TaskList;
