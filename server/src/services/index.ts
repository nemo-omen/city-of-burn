import { users } from './users/users.service';
import type { Application } from '../declarations';

export const services = (app: Application) => {
  app.configure(users);
  // All services will be registered here
};
