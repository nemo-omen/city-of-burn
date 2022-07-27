import * as trpc from '@trpc/server';
import { EventEmitter } from 'events';
import { z } from 'zod';


type Context = {};

interface ChatMessage {
  user: string;
  message: string;
}

const ee = new EventEmitter();

// dummy messages store
const messages: ChatMessage[] = [
  { user: 'user1', message: 'Hey there!' },
  { user: 'user2', message: 'Hi!!' }
];

// now we get to the procedure routes
export const appRouter = trpc
  .router()
  .query('getMessages', {
    input: z.number().default(10),
    resolve({ input }) {
      return messages.slice(-input);
    }
  })
  .mutation('addMessage', {
    input: z.object({
      user: z.string(),
      message: z.string()
    }),
    resolve({ ctx, input }) {
      messages.push(input);
      ee.emit('addMessage');
      return input;
    }
  })
  .subscription('onAdd', {
    resolve({ ctx }) {
      return new trpc.Subscription<ChatMessage>((emit) => {
        const onAdd = (data: ChatMessage) => {
          emit.data(data);
        };

        ee.on('addMessage', onAdd);

        return () => {
          ee.off('addMessage', onAdd);
        };
      });
    }
  });