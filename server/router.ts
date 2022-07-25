import { Router, register } from './deps.ts';

const router = new Router();

router
  .get('/', (ctx) => {
    ctx.response.body = { path: '/' };
  })
  .get('/login', (ctx) => {
    ctx.response.body = { path: '/login' };
  })
  .get('/ws', ({ response }) => {
    response.body = { parh: '/websockets' };
  });

router
  .post('/register', register);

export { router };