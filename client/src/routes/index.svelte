<script lang="ts">
	import '$lib/style/global.css';
	import { GameConnection } from '$lib/stores/GameConnection';
	import GameUI from '$lib/components/GameUI.svelte';
	import Intro from '$lib/components/Intro.svelte';

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
	<Intro on:initGame={initDemoGame} />
{/if}

{#if $GameConnection.inGame === true}
	<GameUI character={defaultCharacter} />
{/if}
