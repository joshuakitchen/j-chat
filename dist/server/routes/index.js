"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.base = exports.setupRoutes = void 0;
var base_page_1 = __importDefault(require("./base.page"));
exports.base = base_page_1.default;
var socket_1 = __importDefault(require("./socket"));
var setupRoutes = function setupRoutes(app) {
    app.ws('/socket', socket_1.default);
};
exports.setupRoutes = setupRoutes;
