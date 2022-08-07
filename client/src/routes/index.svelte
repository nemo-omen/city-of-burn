<script lang="ts">
	import '$lib/style/global.css';
	import { GameConnection, currentCharacter } from '$lib/stores/GameConnection';
	import GameUI from '$lib/components/GameUI.svelte';
	import Intro from '$lib/components/Intro.svelte';

	const defaultCharacter = {
		id: crypto.randomUUID(),
		name: 'Default Person',
		description: 'Just some default person.',
		health: 6,
		strength: 4,
		location: { area: 0, location: 0 },
		user: undefined,
		userId: undefined
	};

	function initDemoGame() {
		$currentCharacter = defaultCharacter;
		if ($GameConnection.inGame === false) {
			$GameConnection.inGame = true;
		}
	}
</script>

{#if $GameConnection.inGame === false}
	<Intro on:initGame={initDemoGame} />
{/if}

{#if $GameConnection.inGame === true}
	<GameUI />
{/if}
