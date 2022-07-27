<script lang="ts">
  import { onMount } from 'svelte';
  import { client, wsClient } from './lib/trpc';

  let fakeUser = {
    email: 'me@me.me',
    password: '123456',
    first: 'Mister',
    last: 'Sister',
  };

  $: messages = [];
  let messageInput = '';

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

  const uuid = crypto.randomUUID();

  async function sendMessage(input) {
    const message = {
      user: uuid,
      message: input,
    };

    client.mutation('addMessage', message);
    // getMessages();
  }

  onMount(() => {
    getMessages();
  });

  const unsub = client.subscription('onAdd', null, {
    onNext(data) {
      if (data.type === 'data') {
        const message = data.data;
        messages = [...messages, { ...message }];
        // console.log(message)
      }
    },
    onError(error) {
      console.error('Error: ', error);
    },
    onDone() {
      console.log('Done - closing websocket');
      wsClient.close();
    },
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
