<script lang="ts">
	import '$lib/style/global.css';
	import { GameConnection } from '$lib/stores/GameConnection';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import GameUI from '$lib/components/GameUI.svelte';
	import GameUi from '$lib/components/GameUI.svelte';

	const defaultCharacter = {
		name: 'Another Person',
		description: 'Just some unknown person.',
		health: 6,
		strength: 4,
		location: 0,
		user: undefined,
		userId: undefined
	};

	function initDemoGame() {
		if ($GameConnection.inGame === false) {
			$GameConnection.inGame = true;
		}
	}
</script>

{#if $GameConnection.inGame === false}
	<div
		class="game-intro"
		in:fade={{ duration: 500, delay: 400, easing: quintInOut }}
		out:fade={{ duration: 500, easing: quintInOut }}
	>
		<p>
			The murmur of bustling passengers wakes you from an uncomfortable sleep. The air smells of
			saltwater, sweat, and rust.
		</p>
		<p>
			You open your eyes and see the low metal ceiling of the ferry's passenger compartment.
			Somewhere nearby a child starts to cry.
		</p>
		<p class="dialog">"You gonna lay there takin' up those seats all day?"</p>
		<p>
			You turn your head and wince from the pain of sleeping on the ferry's hard bench. An old man,
			beard uneven and barely enough teeth to eat stands nearby and stares at you.
		</p>
		<button class="intro-button" on:click={initDemoGame}>Stand Up</button>
	</div>
{/if}

{#if $GameConnection.inGame === true}
	<GameUi character={defaultCharacter} />
{/if}

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
