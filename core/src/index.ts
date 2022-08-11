import { ECS } from './ECS';
import { Game } from './Game';
import { Entity } from './Entity';
import { Actor } from './Actor';
import Loop from 'accurate-game-loop';
// Types
import type { Location } from './types/index';
import { Character } from './Character';
import { Item } from './Item';

const game = new Game();

const defaultActor = new Actor({
  name: 'Jim the Damned',
  health: 50,
  healingFactor: 3,
  stamina: 40,
  dexterity: 20,
  will: 25,
  weapon: new Item('An old rusty sword', "It doesn't even glint.", 5, 10)
});

const enemyActor = new Actor({
  name: 'Bob the Belligerent',
  health: 50,
  healingFactor: 3,
  stamina: 30,
  dexterity: 25,
  will: 20,
  weapon: new Item('An unusually small mace', 'It appears too small to do much damage', 5, 10)
});

game.addActor(defaultActor);
game.addActor(enemyActor);

const loopPeriod = 1;

const battleUpdate = () => {
  if (defaultActor.isAlive() && enemyActor.isAlive()) {
    defaultActor.hit(enemyActor);
    enemyActor.hit(defaultActor);
  }
  checkDead();
};

const hitUpdate = () => {
  defaultActor.harm.use(5);
  if (!defaultActor.inBattle) defaultActor.inBattle = true;
  console.log('harmed health: ', defaultActor.health);
  checkDead();
};

const healUpdate = () => {
  for (let actor of [defaultActor, enemyActor]) {
    if (actor.isAlive()) {
      actor.heal.use();
    }
  }
  checkMaxHealth();
};

const hitLoop = new Loop(hitUpdate, loopPeriod);
const healLoop = new Loop(healUpdate, 1.25);
const battleLoop = new Loop(battleUpdate, loopPeriod);
function checkDead() {
  for (let actor of [defaultActor, enemyActor]) {
    if (!actor.isAlive()) {
      battleLoop.stop();
      healLoop.stop();
      console.log(`${actor.name} is dead!`);
    }
  }
}

function checkMaxHealth() {
  if (defaultActor.isFullyHealed()) healLoop.stop();
}

// hitLoop.start();
battleLoop.start();
healLoop.start();

export { ECS, Game, Entity };
export type { Location };