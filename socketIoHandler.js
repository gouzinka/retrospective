import { Server } from 'socket.io';
import { config } from 'dotenv';
import { getTimer, handleTimerEvents } from './socketHandlers/timerManagerHandlers';
import { handleRetrospectiveEvents } from './socketHandlers/retrospectiveHandlers';
import { handleActionPointEvents } from './socketHandlers/actionPointHandlers';
import { handleCardEvents } from './socketHandlers/cardHandlers';
import { handleUserEvents } from './socketHandlers/userHandlers';

config();
const envPrefix = process.env.NODE_ENV === 'production' ? 'PROD_' : 'DEV_';

let io;
function injectSocketIO(server) {
	if (!io) {
		io = new Server(server, {
			cors: {
				origin: process.env[`${envPrefix}CORS_ORIGIN`],
				methods: ['GET', 'POST']
			}
		});

		io.on('connection', (socket) => {
			console.log(`a user connected: ${socket.id}`);
			socket.on('join', (sessionId) => {
				socket.join(sessionId);
				socket.emit('timer', getTimer(sessionId));
			});

			handleTimerEvents(socket, io);
			handleUserEvents(socket, io);
			handleCardEvents(socket, io);
			handleActionPointEvents(socket, io);
			handleRetrospectiveEvents(socket, io);
		});

		console.log('SocketIO injected');
	}
}

export { io, injectSocketIO };
export function getIoInstance() {
	return io;
}
