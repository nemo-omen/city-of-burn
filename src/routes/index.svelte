<script lang="ts">
	import '$lib/style/global.css';
	import { onMount } from 'svelte';
	import { io } from 'socket.io-client';

	let socket;

	function initDemoGame() {}

	// onMount(async () => {
	// 	if (import.meta.env.PROD) {
	// 		socket = io('http://localhost:3000');
	// 	} else {
	// 		socket = io();
	// 	}
	// 	socket.on('connect', () => {
	// 		console.log('Socket connected');
	// 	});
	// });
</script>

<div class="game-intro">
	<p>
		The murmur of bustling passengers wakes you from an uncomfortable sleep. The air smells of
		saltwater, sweat, and rust.
	</p>
	<p>
		You open your eyes and see the low metal ceiling of the ferry's passenger compartment. Somewhere
		nearby a child starts to cry.
	</p>
	<p class="dialog">"You gonna lay there takin' up those seats all day?"</p>
	<p>
		You turn your head and wince from the pain of sleeping on the ferry's hard bench. An old man,
		beard uneven and barely enough teeth to eat stands nearby and stares at you.
	</p>
	<button class="intro-button">Stand Up</button>
</div>

<style>
	.game-intro {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-s-m);
		font-size: var(--step-1);
		height: 100%;
		padding: 1rem;
		font-family: var(--serif);
	}

	.game-intro p {
		letter-spacing: 0.1em;
		line-height: 1.75em;
		text-align: center;
	}

	.intro-button {
		font-size: var(--step-2);
		letter-spacing: 0.125em;
		background-color: var(--background);
		transition: all var(--transition-default);
		font-weight: bold;
		border: 2px solid var(--accent);
		color: var(--accent);
	}

	.intro-button:hover {
		border-color: var(--accent-light);
		color: var(--accent-light);
	}

	.intro-button:focus,
	.intro-button:active {
		outline: 2px solid var(--foreground);
		color: var(--foreground);
		border-color: var(--foreground);
		/* background: var(--background); */
	}
</style>
