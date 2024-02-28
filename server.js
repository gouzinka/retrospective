import http from 'http';
import express from 'express';
import { injectSocketIO } from './socketIoHandler.js';
import { handler } from './build/handler.js';
import { config } from 'dotenv';

config();
const envPrefix = process.env.NODE_ENV === 'production' ? 'PROD_' : 'DEV_';

const app = express();
const server = http.createServer(app);

// Inject SocketIO
injectSocketIO(server);

// SvelteKit handlers
app.use(handler);
const serverPort = process.env.PORT || process.env[`${envPrefix}SOCKET_IO_PORT`];
server.listen(serverPort, () => {
	console.log(`Server is listening on http://localhost:${serverPort}`);
});
