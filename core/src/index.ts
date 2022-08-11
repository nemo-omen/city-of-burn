import { ECS } from './ECS';
import { Game } from './Game';
import { Entity } from './Entity';
import { Actor } from './Actor';
import Loop from 'accurate-game-loop';
// Types
import type { Location } from './types/index';
import { Character } from './Character';

const game = new Game();

const defaultActor = new Actor({ health: 50, healingFactor: 3, stamina: 40, dexterity: 20, will: 25 });

game.addActor(defaultActor);

const loopPeriod = 1;

const hitUpdate = () => {
  defaultActor.health = defaultActor.harm.use(defaultActor.health, 5);
  console.log('harmed health: ', defaultActor.health);
  checkDead();
};

const healUpdate = () => {
  defaultActor.health = defaultActor.heal.use(defaultActor.health, 50);
  console.log('healed health: ', defaultActor.health);
  checkMaxHealth();
};

const hitLoop = new Loop(hitUpdate, loopPeriod);
const healLoop = new Loop(healUpdate, 1.25);

function checkDead() {
  if (!defaultActor.isAlive()) hitLoop.stop();
}

function checkMaxHealth() {
  if (defaultActor.isFullyHealed()) healLoop.stop();
}

hitLoop.start();
healLoop.start();

export { ECS, Game, Entity };
export type { Location };