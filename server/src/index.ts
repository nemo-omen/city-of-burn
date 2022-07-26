import express from 'express';
import cors from 'cors';
import { dbVars } from './constants.js';

const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response
    .status(200)
    .json({
      hello: 'world'
    });
});

if (import.meta.env.PROD) {
  const PORT = 8080;

  app.listen(PORT);

  console.log(`Server running at http://localhost:${PORT}`);
}

export const viteNodeApp = app;