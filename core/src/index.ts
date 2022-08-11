import { ECS } from './ECS';
import { Game } from './Game';
import { Entity } from './Entity';
import { Actor } from './Actor';
import Loop from 'accurate-game-loop';
// Types
import type { Location } from './types/index';
import { Character } from './Character';

const game = new Game();

const defaultActor = new Actor({
  name: 'Jim the Damned',
  health: 50,
  healingFactor: 3,
  stamina: 40,
  dexterity: 20,
  will: 25
});

const enemyActor = new Actor({
  name: 'Bob the Belligerent',
  health: 50,
  healingFactor: 2,
  stamina: 30,
  dexterity: 25,
  will: 20
});

game.addActor(defaultActor);
game.addActor(enemyActor);

const loopPeriod = 1;

const hitUpdate = () => {
  defaultActor.harm.use(5);
  console.log('harmed health: ', defaultActor.health);
  checkDead();
};

const healUpdate = () => {
  defaultActor.heal.use();
  console.log('healed health: ', defaultActor.health);
  checkMaxHealth();
};

const hitLoop = new Loop(hitUpdate, loopPeriod);
const healLoop = new Loop(healUpdate, 1.25);

function checkDead() {
  if (!defaultActor.isAlive()) {
    hitLoop.stop();
    console.log(`${defaultActor.name} is dead.`);
  }
}

function checkMaxHealth() {
  if (defaultActor.isFullyHealed()) healLoop.stop();
}

hitLoop.start();
healLoop.start();

export { ECS, Game, Entity };
export type { Location };