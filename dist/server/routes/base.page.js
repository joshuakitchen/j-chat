"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseRoute = void 0;
var path_1 = __importDefault(require("path"));
var baseRoute = function baseRoute(req, res, next) {
    res.sendFile(path_1.default.resolve(__dirname, '../../../index.html'));
};
exports.baseRoute = baseRoute;
exports.default = exports.baseRoute;
