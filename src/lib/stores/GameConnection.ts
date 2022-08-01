import { writable } from 'svelte/store';

export const GameConnection = writable({ inGame: false, connected: false });