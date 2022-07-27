import type { AppRouter } from '@city-of-burn/server';
import { createTRPCClient } from '@trpc/client';

export const client = createTRPCClient<AppRouter>({
  url: 'http://localhost:8080/trpc'
});
