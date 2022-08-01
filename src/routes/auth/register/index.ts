import type { RequestHandler } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';
import * as cookie from 'cookie';
import { db } from '$lib/db';

export const POST: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');
  const username = form.get('username');
  const password = form.get('password');


  if (typeof email !== 'string' || typeof password !== 'string' || typeof username !== 'string') {
    return {
      status: 400,
      body: {
        error: 'Something went wrong!'
      }
    };
  }

  if (!email) {
    return {
      status: 400,
      body: {
        error: 'Email is required!'
      }
    };
  }

  if (!username) {
    return {
      status: 400,
      body: {
        error: 'Username is required!'
      }
    };
  }

  if (!password) {
    return {
      status: 400,
      body: {
        error: 'Password is required!'
      }
    };
  }

  try {
    const userRecord = await db.user.create({
      data: {
        email,
        username,
        passwordHash: await bcrypt.hash(password, 10),
      }
    });

    console.log({ userRecord });

    return {
      status: 200,
      body: {
        user: {
          username: userRecord.username,
          email: userRecord.email,
          createdAt: userRecord.createdAt
        },
        success: 'Success'
      },
      headers: {
        'Set-Cookie': cookie.serialize(
          'session',
          userRecord.userAuthToken,
          {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30,
          }
        )
      }
    };
  } catch (error) {
    return {
      status: 400,
      body: {
        error: 'User already exists'
      }
    };
  }
};