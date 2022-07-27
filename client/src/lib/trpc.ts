import type { AppRouter } from '@city-of-burn/server';
import { createTRPCClient } from '@trpc/client';
import { httpLink } from '@trpc/client/links/httpLink';
import { splitLink } from '@trpc/client/links/splitLink';
import { createWSClient, wsLink, type TRPCWebSocketClient } from '@trpc/client/links/wsLink';

export const wsClient: TRPCWebSocketClient = createWSClient({
  url: 'ws://localhost:8081',
});

export const client = createTRPCClient<AppRouter>({
  links: [
    splitLink({
      condition(op) {
        return op.type === 'subscription';
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpLink({
        url: 'http://localhost:8080/trpc'
      })
    })
  ]
});