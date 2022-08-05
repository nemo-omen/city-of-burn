import { Server } from 'socket.io';
// import { Game } from '../game/Game.ts';

const initialMessages = [
	{
		type: 'description',
		from: 'game',
		message:
			'The murmur of bustling passengers wakes you from an uncomfortable sleep. The air smells of saltwater, sweat, and rust.'
	},
	{
		type: 'description',
		from: 'game',
		message:
			"You open your eyes and see the low metal ceiling of the ferry's passenger compartment. Somewhere nearby a child starts to cry."
	},
	{
		type: 'dialog',
		from: 'A gnarly old man',
		message: "You gonna lay there takin' up those seats all day?"
	},
	{
		type: 'description',
		from: 'game',
		message:
			"You turn your head and wince from the pain of sleeping on the ferry's hard bench. An old man, beard uneven and, at most, three teeth stands nearby and stares at you."
	},
	{
		type: 'description',
		from: 'game',
		message: 'You stand up.'
	}
];

export default function injectSocketIO(server) {
	const io = new Server(server, {
		cors: {
			origin: '*'
		}
	});
	// const game = new Game();

	io.on('connection', (socket) => {
		console.log('Connected socket: ', socket.id);

		socket.on('demo-game-init', (message) => {
			console.log('Game init: ', message);
			initialMessages.forEach((msg) => {
				socket.emit('game-message', msg);
			});
		});

		socket.on('command', (message, callback) => {
			console.log(`Command received from: `, message.characterId);
			game.parseCommand(message.command);
			callback({
				ok: true,
				status: 200
			});
		});
	});
}
