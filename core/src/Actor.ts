import { Entity } from './index';
import { Heal } from './capabilities/Heal';
import { Harm } from './capabilities/Harm';

type ActorOptions = {
  health?: number;
  healingFactor?: number;
  stamina?: number;
  dexterity?: number;
  will?: number;
};

export class Actor extends Entity {
  health = 0;
  maxHealth = 0;
  stamina = 0;
  dexterity = 0;
  will = 0;
  heal: Heal = new Heal(0);
  harm: Harm = new Harm();
  constructor (options: ActorOptions) {
    super();

    if (options) {
      if (options.health) this.health = options.health;
      if (options.stamina) this.stamina = options.stamina;
      if (options.dexterity) this.dexterity = options.dexterity;
      if (options.will) this.will = options.will;
      if (options.healingFactor) this.heal.factor = options.healingFactor;
    }

    this.maxHealth = this.health;
  }

  setHealth(health: number) {
    this.health = health;
    this.maxHealth = health;
  }

  setStamina(stamina: number) {
    this.stamina = stamina;
  }

  isAlive() {
    return this.health > 0;
  }

  isConscious() {
    return this.stamina > 5;
  }

  isFullyHealed() {
    return this.health === this.maxHealth;
  }
}