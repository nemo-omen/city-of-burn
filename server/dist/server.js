"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_http = __toESM(require("http"));
var import_socket_handler = __toESM(require("./socket-handler.js"));
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
const app = (0, import_express.default)();
const server = import_http.default.createServer(app);
(0, import_socket_handler.default)(server);
app.use(import_cors.default);
app.get("/healthcheck", (req, res) => {
  res.end("ok");
});
app.listen(3e3, () => {
  console.log("Custom express server listening at http://localhost:3000");
});
//# sourceMappingURL=server.js.map
