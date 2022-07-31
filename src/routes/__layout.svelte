<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>City of Burn</title>
</svelte:head>

<Header />

<main>
	<slot />
</main>

<Footer />

<style>
	main {
		max-width: var(--doc-width);
		margin: 0 auto;
	}

	header {
		margin: 0 0 2rem 0;
		padding: 1rem;
		background: var(--background);
	}

	.header-inner {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		max-width: var(--doc-width);
		margin: 0 auto;
	}

	nav {
		display: flex;
		gap: 1rem;
	}
</style>
