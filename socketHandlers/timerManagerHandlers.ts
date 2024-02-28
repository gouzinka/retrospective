import type { Socket, Server } from 'socket.io';

const timers: Record<string, number> = {};
const timerIntervals: Record<string, any> = {};
const duration: number = 300;

export function handleTimerEvents(socket: Socket, io: Server): void {
	socket.on('start', (sessionId: string): void => {
		timers[sessionId] = timers[sessionId] ?? duration;
		clearInterval(timerIntervals[sessionId]);
		timerIntervals[sessionId] = setInterval(() => {
			timers[sessionId]--;
			if (timers[sessionId] <= 0) {
				clearInterval(timerIntervals[sessionId]);
			}
			io.to(sessionId).emit('timer', timers[sessionId]);
		}, 1000);
	});

	socket.on('pause', (sessionId: string): void => {
		clearInterval(timerIntervals[sessionId]);
	});

	socket.on('reset', (sessionId: string): void => {
		clearInterval(timerIntervals[sessionId]);
		timers[sessionId] = duration;
		io.to(sessionId).emit('timer', timers[sessionId]);
	});
}

export function getTimer(sessionId: string): number {
	return timers[sessionId] ?? duration;
}
