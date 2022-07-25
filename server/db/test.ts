import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";

const db = new DB('test.db');

const dummyUsers = [
  {
    email: 'bob@bob.bob',
    username: 'bob'
  },
  {
    email: 'lisa@lisa.lisa',
    username: 'lisa'
  },
  {
    email: 'elix@whatever.lol',
    username: 'elix'
  }
];

export function populateDB() {
  db.query(`DROP TABLE IF EXISTS users`);

  db.query(`
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      username TEXT
    )
  `);

  for (const user of dummyUsers) {
    db.query("INSERT INTO users (email, username) VALUES (?, ?)", [user.email, user.username]);
  }

  for (const result of db.query("SELECT * FROM users")) {
    const [id, email, username] = result;
    console.log({ id, email, username });
  }
}