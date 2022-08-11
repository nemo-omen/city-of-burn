import { Character, Actor, Entity, Location, Component } from './index';

export class Game {
  messageCounter = 0;
  actorCount = 0;
  actors: Actor[] = [];
  public characters: Map<string, Character> = new Map();

  parseCommand(command: string) {
    console.log(`command #${++this.messageCounter} received: ${command}.`);
  }

  join(character: Character) {
    this.characters.set(character.name, character);
  }

  disconnectSocket(socketId: string) {
    const charArray = Array.from(this.characters.values());
    const disconnectedCharacter = charArray.filter((character) => character.socketId === socketId)[0];
    this.characters.delete(disconnectedCharacter.name);
    console.log(this.characters);
  }

  addActor(actor: Actor) {
    this.actors.push(actor);
  }

}