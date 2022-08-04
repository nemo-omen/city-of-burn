<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
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
	import { fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import CharacterSelection from '$lib/components/CharacterSelection.svelte';
	export let user: string;
	export let characters = [];

	let selectedCharacter;

	function setSelectedCharacter(event) {
		selectedCharacter = event.detail;
	}
	// console.log(characters);
</script>

{#if characters.length === 0}
	<div class="charactersheet">
		<h2>Character Sheet</h2>
	</div>
{:else if selectedCharacter === undefined}
	<CharacterSelection {characters} on:selectcharacter={setSelectedCharacter} />
{:else}
	<section
		class="game"
		in:fade={{ duration: 400, easing: quintInOut }}
		out:fade={{ duration: 400, easing: quintInOut }}
	>
		<h2>Game</h2>

		<p>Welcome to the game, {selectedCharacter.name}</p>
	</section>
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
