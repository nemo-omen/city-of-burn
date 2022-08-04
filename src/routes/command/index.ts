import { gameInstance } from '../../../server/server.js';

export async function POST({ request }) {
  const form = await request.formData();
  const command = form.get('command');

  game.parseCommand();

  // TODO: Put together a set of acceptable commands
  // return status 400 (bad request) and an error
  // that says something like `You can't ${command}`

  // TODO: Figure out your message schema!

  const message = {
    type: 'command',
    message: command
  };

  return {
    status: 200,
    body: {
      message
    }
  };
}