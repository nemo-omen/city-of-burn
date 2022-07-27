import express from 'express';
import cors from 'cors';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { dbVars } from './src/constants.js';
import { z } from 'zod';

interface ChatMessage {
  user: string;
  message: string;
}

const messages: ChatMessage[] = [
  { user: 'user1', message: 'Hey there!' },
  { user: 'user2', message: 'Hi!!' }
];

const appRouter = trpc
  .router()
  .query('hello', {
    resolve() {
      return `Hello, world with more stuff added`;
    }
  })
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
    resolve({ input }) {
      messages.push(input);
      return input;
    }
  });

const app = express();
app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null
  })
);

app.get('/', (request, response) => {
  response
    .status(200)
    .json({
      hello: 'world'
    });
});

if (import.meta.env.PROD) {
  const PORT = 8080;

  app.listen(PORT);

  console.log(`Server running at http://localhost:${PORT}`);
}

export type AppRouter = typeof appRouter;
export const viteNodeApp = app;