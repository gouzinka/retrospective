const timers = {};
const timerIntervals = {};
const duration = 300;

export function startTimer(io, sessionId) {
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

export function pauseTimer(sessionId) {
	clearInterval(timerIntervals[sessionId]);
}

export function resetTimer(io, sessionId) {
	clearInterval(timerIntervals[sessionId]);
	timers[sessionId] = duration;
	io.to(sessionId).emit('timer', timers[sessionId]);
}

export function getTimer(sessionId) {
	return timers[sessionId] ?? duration;
}
