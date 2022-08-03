<script lang="ts">
	import { onMount } from 'svelte';
	export let message: Record<string, any>;
	let messageContainer: HTMLDivElement;

	onMount(() => {
		if (messageContainer) {
			messageContainer.scrollIntoView();
		}
	});
</script>

<div class="message" bind:this={messageContainer}>
	{#if message.type === 'dialog'}
		<p>
			<button class="game-entity-button">{message.from}</button> says
			<span class="dialog">"{message.message}"</span>
		</p>
	{:else if message.type === 'userMessage'}
		<span class="user-message">{message.message}</span>
	{:else}
		<p>{message.message}</p>
	{/if}
</div>

<style>
	.message {
		font-size: var(--step-1);
	}

	.user-message {
		color: var(--muted);
		font-size: var(--step-0);
	}
	.game-entity-button {
		transition: all var(--transition-default);
		background: transparent;
		text-decoration: underline;
		text-underline-offset: 0.125em;
		display: inline-block;
		border: none;
		font-size: var(--step-1);
		display: inline;
		margin: 0;
		padding: 0;
	}

	.game-entity-button:hover {
		color: var(--accent);
	}
</style>
