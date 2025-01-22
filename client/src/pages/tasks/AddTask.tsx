import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';

const AddTask: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          dueDate,
        }),
      });

      if (response.ok) {
        alert('Task created successfully!');
        navigate('/tasks'); // Redirect to tasks page
      } else {
        const errorData = await response.json();
        alert(`Failed to create task: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Add New Task</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Task Title</label>
          <input
            type="text"
            className="mt-1 block w-full border rounded-md p-2"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="mt-1 block w-full border rounded-md p-2"
            placeholder="Enter task description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Priority</label>
          <select
            className="mt-1 block w-full border rounded-md p-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            required
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <input
            type="date"
            className="mt-1 block w-full border rounded-md p-2"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <Button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
          Save Task
        </Button>
      </form>
    </div>
  );
};

export default AddTask;
