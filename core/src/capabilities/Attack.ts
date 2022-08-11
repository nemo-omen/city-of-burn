import { Actor } from "../Actor";
import { randomRange } from '../util/randomRange';
export class Attack {
  minDamage: number;
  maxDamage: number;

  constructor (minDamage: number, maxDamage: number) {
    this.minDamage = minDamage;
    this.maxDamage = maxDamage;
  }

  hit(target: Actor) {
    const attackDamage: number = randomRange(this.minDamage, this.maxDamage);
    target.takeAttack(attackDamage);
  }
}