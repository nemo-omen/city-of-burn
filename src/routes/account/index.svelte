<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

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

<div class="profile">
	<h2>Your Account</h2>
	<p>Username: {username}</p>
	<p>Email: {email}</p>
	<p>
		User since: {new Date(createdAt).toLocaleDateString('en-us', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		})}
	</p>
</div>
