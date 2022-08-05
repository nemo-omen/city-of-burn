<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ session, props }) => {
		if (session.user) {
			return {
				status: 302,
				redirect: '/play'
			};
		}

		return { props };
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { session } from '$app/stores';
	import { sendHttp } from '$lib/api';

	export let error: string;
	export let success: string;

	let email = '';
	let password = '';
	let username = '';

	let button: HTMLButtonElement;
	let emailInput: HTMLInputElement;
	let usernameInput: HTMLInputElement;
	let passwordInput: HTMLInputElement;

	let isInvalid = false;

	async function register(event: SubmitEvent) {
		// don't do anything if the form fields aren't valid
		error = '';
		const formEl = event.target as HTMLFormElement;
		const response = await sendHttp(formEl);

		if (response.error) {
			error = response.error;
		}

		if (response.success) {
			success = response.success;
			$session.user = response.user;
		}

		let formFields: Array<HTMLInputElement | HTMLButtonElement> = [
			button,
			emailInput,
			usernameInput,
			passwordInput
		];

		// Disable all form fields just in case!
		formFields.forEach((field: HTMLInputElement | HTMLButtonElement) => {
			if (field !== undefined) {
				field.disabled = true;
			}
		});
		formEl.reset();
	}
</script>

<section class="auth main-content">
	<h2>Register</h2>
	<form on:submit|preventDefault={register} method="post">
		<fieldset>
			<label for="email">Email</label>
			<input type="email" name="email" id="email" required bind:value={email} />
		</fieldset>
		<fieldset>
			<label for="username">Username</label>
			<input type="text" name="username" id="username" required bind:value={username} />
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
		{#if success}
			<div>
				<p>Thank you for signing up!</p>
				<p>
					<a href="/auth/login">Go ahead and log in!</a>
				</p>
			</div>
		{/if}

		<div class="form-group-flex">
			<button type="submit" bind:this={button}>Register</button>
			<a href="/auth/login">Login Instead</a>
		</div>
	</form>
</section>
