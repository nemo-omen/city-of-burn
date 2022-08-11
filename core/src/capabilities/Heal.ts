import { Use } from './Use';

export class Heal extends Use {
  factor: number;
  constructor (factor: number) {
    super();
    this.factor = factor;
  }

  use(currentHealth: number, maxHealth: number): number {
    const healingResult = currentHealth + this.factor;
    if (healingResult <= maxHealth) {
      return currentHealth + this.factor;
    }
    return maxHealth;
  }
}