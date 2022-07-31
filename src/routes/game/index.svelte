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
	export let user: string;
</script>

<h2>Game</h2>

<p>Welcome to the game, {user}</p>
