import type { RequestHandler } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';
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
    await db.user.create({
      data: {
        email,
        username,
        passwordHash: await bcrypt.hash(password, 10),
      }
    });

    return {
      status: 200,
      body: {
        success: 'Success'
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