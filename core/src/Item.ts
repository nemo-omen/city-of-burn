import { Actor } from './Actor';
import { Attack } from './capabilities/Attack';
export class Item {
  minDamage: number;
  maxDamage: number;
  attack: Attack;

  constructor (minDamage: number, maxDamage: number) {
    this.minDamage = minDamage;
    this.maxDamage = maxDamage;
    this.attack = new Attack(minDamage, maxDamage);
  }

  hit(target: Actor) {
    this.attack.hit(target);
  }
}