import { feathers } from '@feathersjs/feathers';
import type {
  UsersData,
  UsersResult,
  UsersQuery,
} from './services/users/users.schema'
import type { Service, TransportConnection, Params } from '@feathersjs/feathers';

export interface ServiceTypes {
  'users': Service<UsersData, UsersResult, Params<UsersQuery>>
  // A mapping of client side services
}

export const createClient = <Configuration = any>(connection: TransportConnection<ServiceTypes>) => {
  const client = feathers<ServiceTypes, Configuration>();

  client.configure(connection);

  return client;
};
