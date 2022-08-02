## Initial dev setup

After cloning this repo create a .env file with `DATABASE_URL="file:./dev.db"` and run `pnpm run db:push` if you're cloning for the first time.


## Some initial thoughts

Just jotting down a few thoughts on different packages that might be needed once I'm past the very early stages of figuring out which technologies to use and how to wire them together.

### Web Client App

For the client - this is a SvelteKit app with a SocketIO backend. During the initial stages of development, it's backed by a simple SQLite database. I may switch to SupaBase, who knows? I'm thinking about keeping the client very simple and using SocketIO as a thin intermediary between the client app and the game.

### Telnet Client App

If I can make the game a standalone package that opens up the possibility of writing multiple client libraries — this could open up possibilities for communicating with traditional Telnet clients.

### Game Server

Again, the idea is to make the game core as standalone as possible so multiple clients can send procedure calls and receive updates as needed. The only problem here is that I honestly have no idea how to make this work. It might just make more sense to integrate everything into the Express/SocketIO server and connect the game instance to that.

### What I don't know

I have no idea how to handle Game instantiation. I'm guessing this will essentially be the same as a single web server instance with some game loops to run update calls, write data as needed, and move things along. What I don't know is whether I want to instantiate a new game instance when a user enters a distinct area of the game.