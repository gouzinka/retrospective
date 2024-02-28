const timers = {};
const timerIntervals = {};
const duration = 300;

export function handleTimerEvents(socket, io) {
	socket.on('start', (sessionId) => {
		timers[sessionId] = timers[sessionId] ?? duration;
		clearInterval(timerIntervals[sessionId]);
		timerIntervals[sessionId] = setInterval(() => {
			timers[sessionId]--;
			if (timers[sessionId] <= 0) {
				clearInterval(timerIntervals[sessionId]);
			}
			io.to(sessionId).emit('timer', timers[sessionId]);
		}, 1000);
        io.to(sessionId).emit('timer-state', 'running');
	});

	socket.on('pause', (sessionId) => {
		clearInterval(timerIntervals[sessionId]);
        io.to(sessionId).emit('timer-state', 'paused');
	});

	socket.on('reset', (sessionId) => {
		clearInterval(timerIntervals[sessionId]);
		timers[sessionId] = duration;
		io.to(sessionId).emit('timer', timers[sessionId]);
		io.to(sessionId).emit('timer-state', 'paused');
	});
}

export function getTimer(sessionId) {
	return timers[sessionId] ?? duration;
}
