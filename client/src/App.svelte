<script lang="ts">
  import { onMount } from 'svelte';
  import { client } from './lib/trpc.ts';

  let fakeUser = {
    email: 'me@me.me',
    password: '123456',
    first: 'Mister',
    last: 'Sister',
  };

  // let serverResponse;
  // let trpcResponse;
  $: messages = [];
  let messageInput = '';

  // fetch('http://localhost:8080')
  //   .then((response) => response.json())
  //   .then((data) => (serverResponse = { ...data }))
  //   .then(() => console.log(serverResponse))
  //   .catch((error) => console.error(error));

  async function getMessages() {
    client
      .query('getMessages')
      .then((response) => (messages = [...response]))
      .catch((error) => console.error(error));
  }

  function handleInput({ key }) {
    if (key === 'Enter') {
      sendMessage(messageInput);
      messageInput = '';
    }
  }

  async function sendMessage(input) {
    const message = {
      user: 'user1',
      message: input,
    };

    client.mutation('addMessage', message);
    getMessages();
  }

  onMount(() => {
    getMessages();
  });
</script>

<main>
  <input type="text" bind:value={messageInput} on:keyup={handleInput} />
  {#if messages}
    <ul>
      {#each messages as message}
        <li>{message.user}: {message.message}</li>
      {/each}
    </ul>
  {/if}
</main>

<style>
</style>
