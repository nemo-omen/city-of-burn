<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session, fetch }) => {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/auth/login'
			};
		}

		const userCharactersResponse = await fetch('/character');
		const userCharactersData = await userCharactersResponse.json();

		return {
			status: 200,
			props: {
				user: session.user,
				characters: userCharactersData.characters
			}
		};
	};
</script>

<script lang="ts">
	import CharacterSelection from '$lib/components/CharacterSelection.svelte';
	import GameUi from '$lib/components/GameUI.svelte';
	import { GameConnection, currentCharacter } from '$lib/stores/GameConnection';

	export let user: string;
	export let characters = [];

	function setSelectedCharacter(event) {
		$currentCharacter = event.detail;
		$GameConnection.inGame = true;
	}
</script>

{#if characters.length === 0}
	<div class="charactersheet">
		<h2>Character Sheet</h2>
	</div>
{:else if $GameConnection.inGame === false}
	<CharacterSelection {characters} on:selectcharacter={setSelectedCharacter} />
{:else}
	<GameUi />
{/if}

<style>
	.character-sheet {
		max-width: var(--doc-width);
		margin: 0 auto;
	}
	.game {
		width: var(--doc-width);
		margin: 0 auto;
	}
</style>
