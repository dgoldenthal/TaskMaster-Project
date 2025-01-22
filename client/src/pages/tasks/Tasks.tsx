import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks'); // Backend endpoint
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleAddTask = () => {
    navigate('/tasks/new'); // Redirect to Add Task Page
  };

  const handleEditTask = (id: number) => {
    navigate(`/tasks/edit/${id}`); // Redirect to Edit Task Page
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <Button onClick={handleAddTask}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground">No tasks available. Click "Add Task" to create one.</p>
        ) : (
          tasks.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
                <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
                  {task.priority}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{task.description}</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Due {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Status: {task.status === 'completed' ? 'Completed' : 'Pending'}
                </p>
                <Button variant="default" onClick={() => handleEditTask(task.id)}>
                  Edit Task
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>
                  Delete Task
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;
