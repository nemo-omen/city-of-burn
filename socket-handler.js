import { Server } from 'socket.io';

export default function injectSocketIO(server) {
	const io = new Server(server);

	io.on('connection', (socket) => {
		console.log('Connected socket: ', socket.id);

		socket.on('message', (message) => {
			console.log(`Message from ${socket.id}: `, message);
		});
	});

	console.log('SocketIO injected');
}
