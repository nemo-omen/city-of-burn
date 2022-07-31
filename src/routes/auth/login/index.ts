import type { RequestHandler } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';
import * as cookie from 'cookie';

import { db } from '$lib/db';

export const POST: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const emailusername = form.get('emailusername');
  const password = form.get('password');

  if (typeof emailusername !== 'string' || typeof password !== 'string') {
    return {
      status: 400,
      body: {
        error: 'Enter a valid username/email and password!'
      }
    };
  }

  if (!emailusername || !password) {
    return {
      status: 400,
      body: {
        error: 'Username/email and password required'
      }
    };
  }

  let user;
  let email;
  let username;

  if (matchesEmail(emailusername)) {
    email = emailusername;
    console.log('Submitted an email address!');
    user = await db.user.findUnique({
      where: { email }
    });
  } else {
    username = emailusername;
    console.log('Must be a username!');
    user = await db.user.findUnique({
      where: { username }
    });
  }

  const passwordMatch = user && (await bcrypt.compare(password, user.passwordHash));

  if (!user) {
    return {
      status: 400,
      body: {
        error: "Couldn't find user."
      }
    };
  }

  if (!passwordMatch) {
    return {
      status: 400,
      body: {
        error: "Password doesn't match"
      }
    };
  }

  return {
    status: 200,
    body: {
      user: username,
      success: 'Success',
    },
    headers: {
      'Set-Cookie': cookie.serialize(
        'session',
        user.userAuthToken,
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
};

function matchesEmail(value: string): boolean {
  const matches = value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return matches;
}