import { sveltekit } from '@sveltejs/kit/vite';
import injectSocketIO from './server/socket-handler';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		{
			name: 'sveltekit-socketio',
			configureServer(server) {
				injectSocketIO(server.httpServer);
			}
		}
	]
};

export default config;
