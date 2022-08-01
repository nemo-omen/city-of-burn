<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ session }) => {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/auth/login'
			};
		}

		return {
			status: 200,
			props: {
				user: session.user
			}
		};
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	export let user: string;
</script>

<section
	class="game"
	in:fade={{ duration: 400, easing: quintInOut }}
	out:fade={{ duration: 400, easing: quintInOut }}
>
	<h2>Game</h2>

	<p>Welcome to the game, {user.username}</p>
</section>
