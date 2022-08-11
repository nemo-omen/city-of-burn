import { Entity } from './index';
import { Heal } from './capabilities/Heal';
import { Harm } from './capabilities/Harm';

type ActorOptions = {
  name?: string;
  health?: number;
  healingFactor?: number;
  stamina?: number;
  dexterity?: number;
  will?: number;
};

export class Actor extends Entity {
  name: string;
  health = 0;
  healingFactor = 0;
  maxHealth = 0;
  stamina = 0;
  dexterity = 0;
  will = 0;
  heal: Heal;
  harm: Harm;
  inBattle = false;
  constructor (options: ActorOptions) {
    super();

    if (options) {
      if (options.name) this.name = options.name;
      if (options.health) this.health = options.health;
      if (options.stamina) this.stamina = options.stamina;
      if (options.dexterity) this.dexterity = options.dexterity;
      if (options.will) this.will = options.will;
      if (options.healingFactor) this.healingFactor = options.healingFactor;
    }
    this.maxHealth = this.health;
    this.heal = new Heal(this);
    this.harm = new Harm(this);
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
    if (this.inBattle) {
      return this.health === this.maxHealth;
    }
    return false;
  }

  takeAttack(damage: number) {
    console.log(`${this.name} has been attacked!`);
    // todo: some function that determines whether
    // a dodge is made
    this.harm.use(damage);
  }

}