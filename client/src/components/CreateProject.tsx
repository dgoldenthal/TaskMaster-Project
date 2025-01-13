import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // React Router hook for navigation

  const handleSaveProject = async () => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/projects',
      { title, description, startDate, dueDate },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token here
        },
      }
    );

    if (response.status === 201) {
      alert('Project saved successfully!');
      navigate('/projects'); // Redirect to projects page
    } else {
      alert('Failed to save the project');
    }
  } catch (error) {
    console.error('Error saving project:', error);
    alert('An error occurred while saving the project.');
  }
};

  return (
    <div>
      <h1>Create Project</h1>
      <div style={{ marginBottom: '10px' }}>
        <label>
          <strong>Title:</strong>
        </label>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          <strong>Description:</strong>
        </label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          <strong>Start Date:</strong>
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ display: 'block', padding: '8px', margin: '5px 0' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          <strong>Due Date:</strong>
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ display: 'block', padding: '8px', margin: '5px 0' }}
        />
      </div>
      <button
        onClick={handleSaveProject}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Save Project
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
    </div>
  );
};

export default CreateProject;
