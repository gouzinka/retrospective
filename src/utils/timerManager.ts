import type { Server } from 'socket.io';

const timers: Record<string, number> = {};
const timerIntervals: Record<string, any> = {};
const duration: number = 300;

export function startTimer(io: Server, sessionId: string): void {
	timers[sessionId] = timers[sessionId] ?? duration;
	clearInterval(timerIntervals[sessionId]);
	timerIntervals[sessionId] = setInterval(() => {
		timers[sessionId]--;
		if (timers[sessionId] <= 0) {
			clearInterval(timerIntervals[sessionId]);
		}
		io.to(sessionId).emit('timer', timers[sessionId]);
	}, 1000);
}

export function pauseTimer(sessionId: string): void {
	clearInterval(timerIntervals[sessionId]);
}

export function resetTimer(io: Server, sessionId: string): void {
	clearInterval(timerIntervals[sessionId]);
	timers[sessionId] = duration;
	io.to(sessionId).emit('timer', timers[sessionId]);
}

export function getTimer(sessionId: string): number {
	return timers[sessionId] ?? duration;
}
