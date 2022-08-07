import { Character, Actor, Entity, Location } from './index';
type Callback =
  | ((event: CustomEvent) => void)
  | ((event: CustomEvent) => Promise<void>);

class Channel {
  name: string;
  callback: Callback;

  constructor (name: string, callback: Callback) {
    this.name = name;
    this.callback = callback;
  }
}

class Character {

}

type Handler<T> = { (data: T): void; };

interface ILiteEvent<T> {
  on(handler: { Handler; }): void;
  off(handler: { Handler; }): void;
}

class LiteEvent<T> implements ILiteEvent<T> {
  private handlers: { Handler; }[] = [];

  public on(handler: { Handler; }): void {
    this.handlers.push(handler);
  }

  public off(handler: { Handler; }): void {
    this.handlers = this.hhandlers.filter((h) => h !== handler);
  }

  public trigger(data?: T) {
    this.handlers.slice(0).forEach((h) => h(data));
  }

  public expose(): ILiteEvent<T> {
    return this;
  }
}

export class Game {
  messageCounter = 0;
  public characters: Map<string, Character> = new Map();
  private readonly onUpdate = new LiteEvent<string>();

  public get Updated() { return this.onUpdate.expose(); };

  parseCommand(command: string) {
    console.log(`command #${++this.messageCounter} received: ${command}.`);
  }

  update(data: unknown) {
    this.onUpdate.trigger(data);
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

}