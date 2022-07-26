import express from 'express';

const PORT = 8080;
const app = express();

app.get('/', (request, response) => {
  response
    .status(200)
    .send('Looks like I work!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});