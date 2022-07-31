import * as cookie from 'cookie';

export async function getSession({ headers }) {
  const cookies = cookie.parse(headers.cookie || "");

  try {
    if (cookies.sessionId) {
      const { sessionId } = cookies;

      if (sessionId === 'session1') {
        return {
          authenticated: true,
          isAdmin: true
        };
      } else if (sessionId === 'session2') {
        return {
          authenticated: true,
          isAdmin: false
        };
      }
    }
  } catch (error) {
    console.error(error);
  }

  return { authenticated: false };
}