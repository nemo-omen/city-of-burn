<script lang="ts">
	import { io, Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { GameConnection } from '$lib/stores/GameConnection';

	export let character = {};

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
			socket.send(character);
		});

		socket.on('disconnect', (reason) => {
			$GameConnection.connected = false;
			console.log('Socket disconnected');
			closeUI();
		});
	});
</script>

<div
	class="game-ui"
	in:fade={{ duration: 400, easing: quintInOut }}
	out:fade={{ duration: 400, easing: quintInOut }}
>
	<aside class="game-sidebar sidebar">
		<h2>Sidebar</h2>
		<button on:click={exitGame}>Leave the Game</button>
	</aside>

	<div class="game-screen">
		<form id="game-input" />
	</div>
	<aside class="secondary-sidebar sidebar">
		<h2>Secondary Sidebar</h2>
	</aside>
</div>

<style>
	.game-ui {
		background: var(--background);
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 3fr 1fr;
	}
	.game-screen {
		width: 100%;
		background: var(--background);
		border: 0.25rem solid var(--background-offset);
		border-top: none;
		border-bottom: none;
	}
	.sidebar {
		display: grid;
	}

	.game-sidebar {
		grid-template-rows: 1fr auto;
	}
	.game-screen {
		display: grid;
		grid-template-rows: 1fr auto;
	}
</style>
