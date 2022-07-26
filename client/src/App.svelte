<script lang="ts">
  import svelteLogo from './assets/svelte.svg';
  import Counter from './lib/Counter.svelte';

  let fakeUser = {
    email: 'me@me.me',
    password: '123456',
    first: 'Mister',
    last: 'Sister',
  };

  let serverResponse;

  fetch('http://localhost:8080')
    .then((response) => response.json())
    .then((data) => (serverResponse = { ...data }))
    .then(() => console.log(serverResponse))
    .catch((error) => console.error(error));
</script>

<main />

<style>
</style>
