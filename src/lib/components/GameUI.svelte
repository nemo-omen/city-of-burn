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
	out={{ duration: 400, easing: quintInOut }}
/>
<button on:click={exitGame}>Leave the Game</button>

<style>
	.game-ui {
		background: var(--background-offset);
	}
</style>
