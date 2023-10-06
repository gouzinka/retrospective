import ioClient from 'socket.io-client';

// Use an environment variable or fallback to localhost
const SERVER_URL = 'http://localhost:5173';
const socket = ioClient(SERVER_URL);

export const io = socket;
