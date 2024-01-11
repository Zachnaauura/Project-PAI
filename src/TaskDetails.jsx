import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Typography, Card, CardContent, TextField } from '@mui/material';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if (!response.ok) {
          throw new Error(`Błąd pobierania szczegółów zadania: ${response.statusText}`);
        }
        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error('Błąd pobierania szczegółów zadania:', error.message);
      }
    };

    fetchTaskDetails();
  }, [id, isEditing]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Szczegóły Zadania
      </Typography>
      <Card>
        <CardContent>
          {isEditing ? (
            <div>
              <TextField
                label="Tytuł"
                variant="outlined"
                fullWidth
                margin="normal"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
              <TextField
                label="Opis"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
              />
              <Button variant="contained" onClick={handleSave}>
                Zapisz
              </Button>
            </div>
          ) : (
            <div>
              <Typography variant="h5" gutterBottom>
                Tytuł: {task.title}
              </Typography>
              <Typography variant="body1" paragraph>
                Opis: {task.description || 'Brak opisu'}
              </Typography>
              <Typography variant="body1" paragraph>
                Status: {task.completed ? 'Wykonane' : 'Niewykonane'}
              </Typography>
              <Typography variant="body1">
                Data dodania: {task.dateAdded || 'Brak daty dodania'}
              </Typography>
              <Link to="/">Powrót do listy zadań</Link>
              <Button variant="contained" onClick={handleEditToggle} style={{ marginLeft: '8px' }}>
                Edytuj
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetails;
