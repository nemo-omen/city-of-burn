import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams } from '@feathersjs/knex';
import { resolveAll } from '@feathersjs/schema';
import { authenticate } from '@feathersjs/authentication';
import type { UsersData, UsersResult, UsersQuery } from './users.schema';
import { usersResolvers } from './users.resolver';

export const usersHooks = {
  around: {
    all: [],
    get: [authenticate('jwt'), resolveAll(usersResolvers)],
    find: [authenticate('jwt'), resolveAll(usersResolvers)],
    create: [resolveAll(usersResolvers)],
    patch: [authenticate('jwt'), resolveAll(usersResolvers)],
    update: [authenticate('jwt'), resolveAll(usersResolvers)],
    remove: [authenticate('jwt'), resolveAll(usersResolvers)],
  },
  before: {},
  after: {},
  error: {},
};

export interface UsersParams extends KnexAdapterParams<UsersQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class UsersService extends KnexService<UsersResult, UsersData, UsersParams> {}
