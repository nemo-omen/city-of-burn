import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";
import { ensureDir } from '../deps.ts';

const dataDir = '../data';

await ensureDir('../data');

const db = new DB(`${dataDir}/test.db`);

const dummyUsers = [
  {
    email: 'bob@bob.bob',
    username: 'bob',
    password: '12345'
  },
  {
    email: 'lisa@lisa.lisa',
    username: 'lisa',
    password: '45678'
  },
  {
    email: 'elix@whatever.lol',
    username: 'elix',
    password: '56789'
  }
];

export function populateDB() {
  db.query(`DROP TABLE IF EXISTS users`);

  db.query(`
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      username TEXT,
      password TEXT
    )
  `);

  for (const user of dummyUsers) {
    db.query("INSERT INTO users (email, username) VALUES (?, ?)", [user.email, user.username]);
  }

  for (const result of db.query("SELECT * FROM users")) {
    const [id, email, username, password] = result;
    console.log({ id, email, username, password });
  }
}