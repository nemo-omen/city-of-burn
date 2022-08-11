import { Actor } from 'src/Actor';
import { Use } from './Use';

export class Harm extends Use {
  actor: Actor;
  constructor (actor: Actor) {
    super();
    this.actor = actor;
  }
  use(damage: number) {
    const harmResult = this.actor.health - damage;
    if (harmResult > 0) {
      this.actor.health = harmResult;
      return;
    }
    this.actor.health = 0;
  }
}