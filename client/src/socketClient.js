import { io } from 'socket.io-client';

// Connect to the Socket.IO server
const socket = io('http://localhost:3000'); // Replace with your server's URL

// Listen for task-related events
socket.on('taskCreated', (data) => {
    console.log('Task Created:', data);
});

socket.on('taskUpdated', (data) => {
    console.log('Task Updated:', data);
});

socket.on('taskDeleted', (data) => {
    console.log('Task Deleted:', data);
});

export default socket;
