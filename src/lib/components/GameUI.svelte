<script lang="ts">
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { GameConnection } from '$lib/stores/GameConnection';

	export let character = {};

	let socket;

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
	in:fade={{ delay: 400, duration: 500, easing: quintInOut }}
	out:fade={{ duration: 400, easing: quintInOut }}
>
	<aside class="game-sidebar sidebar">
		<h2>Sidebar</h2>
		<button on:click={exitGame}>Leave the Game</button>
	</aside>

	<main class="game-screen" />
	<aside class="secondary-sidebar sidebar">
		<h2>Secondary Sidebar</h2>
	</aside>
</div>

<style>
	.game-ui {
		background: var(--background-offset);
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 3fr 1fr;
	}
	.game-screen {
		width: 100%;
		background: var(--background);
	}
	.sidebar {
		border: 1px solid var(--highlight-offset);
	}
</style>
