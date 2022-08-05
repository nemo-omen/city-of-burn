<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit/types';

	export const load: Load = async ({ session, props }) => {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/'
			};
		}

		return {
			props: {
				user: session.user
			}
		};
	};
</script>

<script lang="ts">
	export let user;
	const { username, email, createdAt } = user;
	console.log(user);
</script>

<main>
	<section class="profile">
		<h2>Your Account</h2>
		<strong>Username:</strong><span>{username}</span>
		<strong>Email:</strong><span>{email}</span>
		<strong>User since:</strong>
		<span
			>{new Date(createdAt).toLocaleDateString('en-us', {
				month: 'long',
				day: 'numeric',
				year: 'numeric'
			})}</span
		>
	</section>
</main>

<style>
	.profile {
		display: grid;
		grid-template-rows: repeat(4, 1fr);
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 2rem auto;
	}

	.profile h2 {
		grid-column: 1/3;
	}

	strong,
	span {
		font-size: var(--step-1);
	}
</style>
