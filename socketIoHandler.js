import { Server } from 'socket.io';
import { config } from 'dotenv';
import { startTimer, pauseTimer, resetTimer, getTimer } from './src/utils/timerManager';
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

			// Timer
			socket.on('start', (sessionId) => startTimer(io, sessionId));
			socket.on('pause', (sessionId) => pauseTimer(sessionId));
			socket.on('reset', (sessionId) => resetTimer(io, sessionId));

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
