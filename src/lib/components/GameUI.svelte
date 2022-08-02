<script lang="ts">
	import { io, Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { GameConnection } from '$lib/stores/GameConnection';
	import GameMessage from './GameMessage.svelte';

	export let character = {};

	let gameMessages: Array<Record<string, any>> = [];
	let socket: Socket;
	let gameConsole: HTMLDivElement;

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
	<div class="game-panel grow-1">
		<div class="console-wrapper grow-1">
			<div class="console" bind:this={gameConsole}>
				{#each gameMessages as message}
					<GameMessage {message} />
				{/each}
				<div class="scroll-anchor" />
			</div>
		</div>
		<form class="game-input shrink-0">
			<input type="text" name="command" id="command" class="grow-1" />
			<button type="submit" class="shrink-0">Send</button>
		</form>
	</div>

	<aside class="sidebar shrink-0" id="main-sidebar">
		<button on:click={exitGame}>Exit Game</button>
	</aside>
	<aside class="sidebar shrink-0" id="secondary-sidebar" />
</div>

<style>
	.game-ui {
		background: var(--background);
		height: 100%;
		display: flex;
		/* flex-direction: column; */
	}

	.grow-1 {
		flex-grow: 1;
	}

	.shrink-0 {
		flex-shrink: 0;
	}
	.game-panel {
		border: 0.5rem solid var(--background-offset);
		border-top: 0;
		border-bottom: 0;
		order: 2;
		display: flex;
		flex-direction: column;
	}
	.sidebar {
		width: calc(var(--doc-width-remainder) / 2);
	}
	#main-sidebar {
		order: 1;
	}

	#secondary-sidebar {
		order: 3;
	}

	.game-input {
		display: flex;
		max-width: unset;
		width: 100%;
		gap: 1rem;
		flex-direction: row;
	}
	.console-wrapper {
		position: relative;
	}
	.console {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		max-height: 100%;
		padding: var(--space-xs);
		overflow-y: auto;
		overflow-anchor: none;
		scroll-behavior: smooth;
	}
	:global(.console > * + *) {
		margin-top: var(--space-m);
	}
	.scroll-anchor {
		overflow-anchor: auto;
		height: 1px;
	}
</style>
