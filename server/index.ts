import cors from 'cors';
import * as trpc from '@trpc/server';

import express from 'express';
import ws from 'ws';

import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';

import { dbVars } from './src/constants.js';
import { appRouter } from './router.ts';

// express setup
const app = express();
app.use(cors());

// ws subscription server setup
const wss = new ws.Server({ port: 8081 });

applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext() {
    return {};
  }
});

// route for procedure calls
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext() {
      return {};
    }
  })
);

// base route ... we'll probably change this later
app.get('/', (request, response) => {
  response
    .status(200)
    .json({
      hello: 'world'
    });
});

// listen on 8080 if not dev env
if (import.meta.env.PROD) {
  const PORT = 8080;

  app.listen(PORT);

  console.log(`Server running at http://localhost:${PORT}`);
}

export type AppRouter = typeof appRouter;
export const viteNodeApp = app;