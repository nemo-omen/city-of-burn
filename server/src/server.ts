import { createServer } from 'http';
// import injectSocketIO from './socket-handler';
import express from 'express';
import cors from 'cors';
import { initialMessages, startSocketServer } from './socket-handler';

const app = express();
const httpServer = createServer(app);

startSocketServer(httpServer);

app.use(cors);

httpServer.listen(3000, () => {
	console.log('Server listening at http://localhost:3000');
});
