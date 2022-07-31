import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/db';

export const GET: RequestHandler = async ({ params }) => {
  const username: string = params.user;

  const storedUser = await db.user.findUnique({
    where: { username }
  });

  if (!storedUser) {
    return {
      status: 303,
      location: '/'
    };
  }

  console.log('user: ', storedUser);

  const user = {
    id: storedUser.id,
    email: storedUser.email,
    username: storedUser.username,
    createdAt: storedUser.createdAt
  };

  return {
    status: 200,
    body: {
      user
    }
  };
};