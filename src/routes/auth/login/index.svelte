<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ session, props }) => {
		if (session.user) {
			return {
				status: 302,
				redirect: '/game'
			};
		}

		return { props };
	};
</script>

<script lang="ts">
	import { session } from '$app/stores';
	import { sendHttp } from '$lib/api';

	export let error: string;

	let emailusername: string = '';
	let password: string = '';

	let button: HTMLButtonElement;

	async function login(event: SubmitEvent) {
		const formEl = event.target as HTMLFormElement;
		const response = await sendHttp(formEl);

		if (response.error) {
			error = response.error;
		}

		$session.user = response.user;

		button.disabled = true;
		formEl.reset();
	}
</script>

<main>
	<section class="auth">
		<h2>Login</h2>

		<form on:submit|preventDefault={login} method="post">
			<fieldset>
				<label for="emailusername">Email or Username</label>
				<input
					type="text"
					name="emailusername"
					id="emailusername"
					required
					bind:value={emailusername}
					minlength="8"
				/>
			</fieldset>
			<fieldset>
				<label for="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					minlength="8"
					required
					bind:value={password}
				/>
			</fieldset>

			{#if error}
				<p class="error">{error}</p>
			{/if}

			<div class="form-group-flex">
				<button type="submit" bind:this={button}>Log In</button>
				<a href="/auth/register">Register Instead</a>
			</div>
		</form>
	</section>
</main>
