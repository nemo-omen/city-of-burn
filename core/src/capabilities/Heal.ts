import { Use } from './Use';
import { Actor } from '../Actor';

export class Heal extends Use {
  actor: Actor;
  constructor (actor: Actor) {
    super();
    this.actor = actor;
  }

  use(): void {
    const healingResult = this.actor.health + this.actor.healingFactor;
    if (healingResult <= this.actor.maxHealth) {
      this.actor.health = healingResult;
      return;
    }
    this.actor.health = this.actor.maxHealth;
  }
}