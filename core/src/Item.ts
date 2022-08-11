import { Actor } from './Actor';
import { Attack } from './capabilities/Attack';
export class Item {
  name: string;
  description: string;
  minDamage: number;
  maxDamage: number;
  attack: Attack;

  constructor (name: string, description: string, minDamage: number, maxDamage: number) {
    this.name = name;
    this.description = description;
    this.minDamage = minDamage;
    this.maxDamage = maxDamage;
    this.attack = new Attack(minDamage, maxDamage);
  }

  hit(target: Actor) {
    this.attack.hit(target);
  }
}