import { Application, router } from "./deps.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { populateDB } from './db/test.ts';

const app = new Application();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', ({ hostname, port, secure, serverType }) => {
  console.log(`${serverType} server listening at ${secure ? 'https://' : 'http://'} ${hostname ?? 'localhost'}:${port}`);
});

app.addEventListener('error', ({ error }) => {
  console.log(error);
});

populateDB();

app.listen({ port: 8080 });

