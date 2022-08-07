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
var src_exports = {};
__export(src_exports, {
  Actor: () => import_Actor.Actor,
  Entity: () => import_Entity.Entity,
  Game: () => import_Game.Game,
  Location: () => import_Location.Location
});
module.exports = __toCommonJS(src_exports);
var import_Game = require("./Game");
var import_Entity = require("./Entity");
var import_Actor = require("./Actor");
var import_Location = require("./Location");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Actor,
  Entity,
  Game,
  Location
});
//# sourceMappingURL=index.js.map
