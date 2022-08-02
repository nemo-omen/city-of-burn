<script lang="ts">
	import { io, Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { GameConnection } from '$lib/stores/GameConnection';

	export let character = {};

	let gameMessages = [];
	let socket: Socket;

	function exitGame() {
		socket.disconnect();
	}

	function closeUI() {
		$GameConnection.inGame = false;
	}

	onMount(async () => {
		if (import.meta.env.PROD) {
			socket = io('http://localhost:3000');
		} else {
			socket = io();
		}

		socket.on('connect', () => {
			$GameConnection.connected = true;
			console.log('Socket connected');
			socket.emit('demo-game-init', character);
		});

		socket.on('disconnect', (reason) => {
			$GameConnection.connected = false;
			console.log('Socket disconnected');
			closeUI();
		});

		socket.on('game-message', (message) => {
			console.log(message);
			gameMessages = [...gameMessages, message];
		});
	});
</script>

<div
	class="game-ui"
	in:fade={{ duration: 400, easing: quintInOut }}
	out:fade={{ duration: 400, easing: quintInOut }}
>
	<aside class="sidebar" />

	<div class="game-output">
		<button on:click={exitGame}>Exit Game</button>
	</div>

	<aside class="sidebar" />
</div>

<style>
	.game-ui {
		background: var(--background);
		height: 100%;
		display: flex;
	}
	.game-output {
		flex-grow: 2.5;
	}
	.sidebar {
		flex-grow: 1;
	}
</style>
