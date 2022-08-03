import http from 'http';
import { handler } from '../build/handler.js';
import injectSocketIO from './socket-handler.js';
import express from 'express';

const app = express();
const server = http.createServer(app);

injectSocketIO(server);

app.use(handler);

app.get('/healthcheck', (req, res) => {
	res.end('ok');
});

app.listen(3000, () => {
	console.log('Custom express server listening at http://localhost:3000');
});
