import type { AppRouter } from '@city-of-burn/server';
import { createTRPCClient } from '@trpc/client';
import { httpLink } from '@trpc/client/links/httpLink';
import { splitLink } from '@trpc/client/links/splitLink';
import { createWSClient, wsLink } from '@trpc/client/links/wsLink';

export const client = createTRPCClient<AppRouter>({
  url: 'http://localhost:8080/trpc'
});
