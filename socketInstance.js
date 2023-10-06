import { Server } from 'socket.io';
import { config } from 'dotenv';

config();
const envPrefix = process.env.NODE_ENV === 'production' ? 'PROD_' : 'DEV_';

export let io;

export function initializeSocketIO(server) {
	if (!io) {
		io = new Server(server, {
			cors: {
				origin: process.env[`${envPrefix}CORS_ORIGIN`],
				methods: ['GET', 'POST']
			}
		});
	}
	return io;
}

export function getSocketIO() {
	if (!io) {
		throw new Error('Socket.io has not been initialized. Please call initializeSocketIO first.');
	}
	return io;
}
