<script lang="ts">
	import { session } from '$app/stores';
</script>

<header>
	<div class="header-inner inner">
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
				<a href="/play">Play</a>
				<a href="/account">Account</a>
				<a href="/auth/logout">Log Out</a>
			{/if}
		</nav>
	</div>
</header>

<style>
	header {
		margin: 0;
		padding: 1rem;
		background: var(--background-offset);
	}
	nav {
		display: flex;
		gap: 1rem;
		font-size: var(--step--1);
	}

	.header-inner {
		flex-wrap: wrap;
	}

	.site-anchor {
		font-family: var(--serif);
		letter-spacing: 0.15em;
	}
</style>
