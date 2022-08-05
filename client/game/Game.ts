// Nope, too early
// work on some models first so
// you know what you need
export class Game {
  messageCounter = 0;

  parseCommand(command: string) {
    console.log(`command #${++this.messageCounter} received: ${command}.`);
  }
}