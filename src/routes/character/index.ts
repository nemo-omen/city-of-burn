import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const GET: RequestHandler = async ({ request }) => {

  const cookieHeader = request.headers.get('cookie');
  const cookies = cookie.parse(cookieHeader ?? '');

  if (!cookies || !cookies.session) {
    return {
      status: 302,
      redirect: '/auth/login'
    };
  }

  const currentUser = await db.user.findUnique({
    where: { userAuthToken: cookies.session }
  });

  const characters = await db.character.findMany({
    where: { userId: currentUser.id }
  });

  return {
    status: 200,
    body: {
      characters
    }
  };
};