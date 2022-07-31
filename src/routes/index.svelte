<script lang="ts">
	import '$lib/style/global.css';
	import { onMount } from 'svelte';
	import { io } from 'socket.io-client';

	// let socket;

	// onMount(async () => {
	// 	if (import.meta.env.PROD) {
	// 		socket = io('http://localhost:3000');
	// 	} else {
	// 		socket = io();
	// 	}
	// 	socket.on('connect', () => {
	// 		console.log('Socket connected');
	// 	});
	// });
</script>
