"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Game_exports = {};
__export(Game_exports, {
  Game: () => Game
});
module.exports = __toCommonJS(Game_exports);
class Channel {
  name;
  callback;
  constructor(name, callback) {
    this.name = name;
    this.callback = callback;
  }
}
class Character {
}
class LiteEvent {
  handlers = [];
  on(handler) {
    this.handlers.push(handler);
  }
  off(handler) {
    this.handlers = this.hhandlers.filter((h) => h !== handler);
  }
  trigger(data) {
    this.handlers.slice(0).forEach((h) => h(data));
  }
  expose() {
    return this;
  }
}
class Game {
  messageCounter = 0;
  characters = /* @__PURE__ */ new Map();
  onUpdate = new LiteEvent();
  get Updated() {
    return this.onUpdate.expose();
  }
  parseCommand(command) {
    console.log(`command #${++this.messageCounter} received: ${command}.`);
  }
  update(data) {
    this.onUpdate.trigger(data);
  }
  join(character) {
    this.characters.set(character.name, character);
  }
  disconnectSocket(socketId) {
    const charArray = Array.from(this.characters.values());
    const disconnectedCharacter = charArray.filter((character) => character.socketId === socketId)[0];
    this.characters.delete(disconnectedCharacter.name);
    console.log(this.characters);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Game
});
//# sourceMappingURL=Game.js.map
