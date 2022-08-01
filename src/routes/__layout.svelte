<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>City of Burn</title>
</svelte:head>

<Header />

<slot />

<Footer />

<style>
</style>
