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
var socket_handler_exports = {};
__export(socket_handler_exports, {
  initialMessages: () => initialMessages,
  startSocketServer: () => startSocketServer
});
module.exports = __toCommonJS(socket_handler_exports);
var import_socket = require("socket.io");
var import_core = require("@city-of-burn/core");
const initialMessages = [
  {
    type: "description",
    from: "game",
    message: "The murmur of bustling passengers wakes you from an uncomfortable sleep. The air smells of saltwater, sweat, and rust."
  },
  {
    type: "description",
    from: "game",
    message: "You open your eyes and see the low metal ceiling of the ferry's passenger compartment. Somewhere nearby a child starts to cry."
  },
  {
    type: "dialog",
    from: "A gnarly old man",
    message: "You gonna lay there takin' up those seats all day?"
  },
  {
    type: "description",
    from: "game",
    message: "You turn your head and wince from the pain of sleeping on the ferry's hard bench. An old man, beard uneven and, at most, three teeth stands nearby and stares at you."
  },
  {
    type: "description",
    from: "game",
    message: "You stand up."
  }
];
function startSocketServer(server) {
  const io = new import_socket.Server(server, {
    cors: {
      origin: "*"
    }
  });
  const game = new import_core.Game();
  game.Updated.on((data) => console.log("Data emitted from Game onupdate event: ", data));
  game.update({ hello: "world" });
  io.on("connection", (socket) => {
    console.log("Connected socket: ", socket.id);
    socket.on("demo-game-init", (character) => {
      character.socketId = socket.id;
      game.join(character);
      initialMessages.forEach((msg) => {
        socket.emit("game-message", msg);
      });
    });
    socket.on("command", (message, callback) => {
      console.log(`Command received from: `, message.characterId);
      game.parseCommand(message.command);
      callback({
        ok: true,
        status: 200
      });
    });
    socket.on("disconnect", () => {
      game.disconnectSocket(socket.id);
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initialMessages,
  startSocketServer
});
//# sourceMappingURL=socket-handler.js.map
