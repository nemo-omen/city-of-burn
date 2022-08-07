import { Location } from './index';

export class Entity {
  id: string;
  name: string;
  description: string;

  location: Location = { area: 0, room: 0 };

  matchName(input: string) {
    return this.name.startsWith(input);
  }
}