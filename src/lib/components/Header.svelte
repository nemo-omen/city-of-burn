<script lang="ts">
	import { session } from '$app/stores';
</script>

<header>
	<div class="header-inner">
		<a href="/" class="site-anchor">
			<h1>City of Burn</h1>
		</a>

		<nav>
			<a href="/">Home</a>

			{#if !$session.user}
				<a href="/auth/login">Login</a>
				<a href="/auth/register">Register</a>
			{/if}

			{#if $session.user}
				<a href="/game">Play</a>
				<a href="/auth/logout">Log Out</a>
			{/if}
		</nav>
	</div>
</header>

<style>
	header {
		margin: 0 0 2rem 0;
		padding: 1rem;
		background: var(--background-offset);
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
