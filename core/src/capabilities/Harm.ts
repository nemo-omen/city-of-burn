import { Use } from './Use';

export class Harm extends Use {
  use(currentHealth: number, damage: number) {
    const harmResult = currentHealth - damage;
    if (harmResult > 0) return harmResult;
    return 0;
  }
}