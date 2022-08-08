## Initial dev setup
This is a monorepo with packages for the client, server, and game. That may change in the near future. Right now the organization makes sense to me.

### Push DB & Initialize Prisma Client
After cloning this repo create a .env file in `/client` with `DATABASE_URL="file:./client/dev.db"` and, from within the `/client` directory, run `npx prisma db push` if you're cloning for the first time.

### Install Packages
From the top-level `/` directory, run `pnpm install`. This will install all dependencies for all packages.

### Run Dev
From the top-level `/` directory run `pnpm run dev` and NX will handle running all of the packages within the monorepo.

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

### ECS Implementations

After spending a weekend reading about implementing a simple ECS approach, I know I probably don't want to do it by myself. I'm going to try out a couple of ECS libraries with priority given to documentation, developer experience, and performance (in that order). This is probably going to be a pretty small game, so a performance difference of a couple hundred (usually less) milliseconds isn't going to bother me as much as not understanding how to use a library will.

#### Currently Under Consideration

[Javelin](https://javelin.games/ecs/) - a whole-ass set of packages for making multiplayer games. Could be just what I need. Nice docs.

[Becsy](https://lastolivegames.github.io/becsy/) - multi-threaded ECS for Typescript. Very nice docs!

[geotic](https://github.com/ddmills/geotic) - seems mature and stable. Docs are a single `README.md` but they seem to be thorough. The library also looks to have a lot of functionality.
- See a roguelike tutorial that uses geotic here: [Javascript rewrite of the Complete Roguelike Tutorial](https://github.com/luetkemj/jsrlt)

[Miski](https://github.com/phughesmcr/Miski) - Includes archetypes, API documentation. Still pretty new, though, and docs are a little light. API is likely not stable, but looks promising.

[harmony-ecs](https://github.com/3mcd/harmony-ecs) - good docs

[miniplex](https://github.com/hmans/miniplex) - easy to understand

[uecs](https://github.com/jprochazk/uecs) - small lib and API, also small docs, could be easy

**maybe?**


[wolf-ecs](https://github.com/EnderShadow8/wolf-ecs) - function based, might be easy to use but docs arekind of sparse