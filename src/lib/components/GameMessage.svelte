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
	<p>{message.message}</p>
</div>

<style>
	.message {
		font-size: var(--step-1);
	}
</style>
