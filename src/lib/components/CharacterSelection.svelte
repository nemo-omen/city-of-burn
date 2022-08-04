<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let characters = [];

	function selectCharacter(character) {
		dispatch('selectcharacter', character);
	}
</script>

<div class="character-selection">
	<h2>Choose a Character</h2>
	<div class="character-grid">
		{#each characters as character}
			<button class="character-card" on:click={() => selectCharacter(character)}>
				<h3>{character.name}</h3>
				<p>{character.description}</p>
				<ul class="character-card-stats">
					<li>Location: {character.location}</li>
					<li>Health: {character.health}</li>
					<li>Strength: {character.strength}</li>
				</ul>
			</button>
		{/each}
	</div>
</div>

<style>
	h2 {
		text-align: center;
	}
	.character-selection {
		width: var(--doc-width);
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: var(--space-s-m);
	}
	.character-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	}
	.character-card {
		/* background: tomato; */
		text-align: start;
	}
	.character-card-stats {
		list-style-type: none;
	}
</style>
