"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
var winston_1 = __importDefault(require("winston"));
var app_config_1 = __importDefault(require("../app.config"));
var constants_1 = require("../constants");
var util_1 = require("../util");
var uuid4_1 = __importDefault(require("uuid4"));
var clients = {};
var AUDIO_REGEX = /power|cum|nope|no|nice|noice|yeah|yh|ye|shut\ up|stfu|awesome|hello|hi|hey/gi;
var sendToAll = function (packet) {
    Object.values(clients).forEach(function (item) {
        item.send(JSON.stringify(packet));
    });
};
var handlePacket = function handlePacket(ws, data) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, packetType, payload, message_1, action, msg, audio_1, match, id;
        return __generator(this, function (_b) {
            _a = JSON.parse(data), packetType = _a.packetType, payload = _a.payload;
            if (packetType === 'message') {
                message_1 = payload;
                if (message_1.length === 0)
                    return [2 /*return*/];
                if (message_1.startsWith('!')) {
                    action = false;
                    msg = message_1.substring(1, message_1.length).split(' ');
                    switch (msg[0].toLowerCase()) {
                        case 'makemeadmin':
                            action = true;
                            if (msg[1] === app_config_1.default.admin_key) {
                                winston_1.default.info("[".concat((0, util_1.getDateString)(), "][WS][").concat(ws.id, "]: ").concat(ws.name, "] has been made admin."));
                                ws.is_admin = true;
                                sendToAll({
                                    packetType: 'message',
                                    payload: {
                                        message: "".concat(ws.name, " is now an administrator."),
                                        name: 'System',
                                        audio: null,
                                    },
                                });
                            }
                            else {
                                winston_1.default.warn("[".concat((0, util_1.getDateString)(), "][WS][").concat(ws.id, "]: ").concat(ws.name, "] tried to make themselves admin using a wrong key."));
                                ws.send(JSON.stringify({
                                    packetType: 'message',
                                    payload: {
                                        message: "Invalid admin key.",
                                        name: 'System',
                                        audio: null,
                                    },
                                    id: ws.id,
                                }));
                            }
                            break;
                    }
                    if (action)
                        return [2 /*return*/];
                }
                audio_1 = null;
                match = message_1.toLowerCase().match(AUDIO_REGEX);
                if (match) {
                    audio_1 = match[0];
                    if (audio_1 === 'noice')
                        audio_1 = 'nice';
                    else if (audio_1 === 'yh' || audio_1 === 'ye')
                        audio_1 = 'yeah';
                    else if (audio_1 === 'stfu')
                        audio_1 = 'shut up';
                    else if (audio_1 === 'hi' || audio_1 === 'hey')
                        audio_1 = 'hello';
                }
                Object.values(clients).forEach(function (item) {
                    item.send(JSON.stringify({
                        packetType: 'message',
                        payload: {
                            message: message_1,
                            name: ws.name,
                            audio: audio_1,
                        },
                        id: ws.id,
                    }));
                });
                winston_1.default.info("[".concat((0, util_1.getDateString)(), "][WS][").concat(ws.id, "] Message has been sent [").concat(ws.name, "]: ").concat(message_1));
            }
            else if (packetType === 'connect') {
                id = (0, uuid4_1.default)();
                while (clients[id])
                    id = (0, uuid4_1.default)();
                ws.id = id;
                ws.name = "".concat(constants_1.ADJECTIVES[Math.floor(Math.random() * constants_1.ADJECTIVES.length)], " ").concat(constants_1.NAMES[Math.floor(Math.random() * constants_1.NAMES.length)]);
                ws.send(JSON.stringify({
                    packetType: 'connected',
                    payload: {
                        id: id,
                        name: ws.name,
                        peers: Object.values(clients).map(function (item) { return ({
                            id: item.id,
                            name: item.name,
                        }); }),
                    },
                }));
                ws.send(JSON.stringify({
                    packetType: 'message',
                    payload: {
                        message: 'Welcome to Chatter!',
                        name: 'System',
                        audio: null,
                    },
                }));
                clients[id] = ws;
                Object.values(clients).forEach(function (item) {
                    if (item.name !== ws.name) {
                        item.send(JSON.stringify({
                            packetType: 'message',
                            payload: {
                                message: "".concat(ws.name, " has just entered Chatter."),
                                name: 'System',
                                audio: null,
                            },
                        }));
                    }
                    item.send(JSON.stringify({
                        packetType: 'join',
                        payload: {
                            id: ws.id,
                            name: ws.name,
                        },
                    }));
                });
                winston_1.default.info("[".concat((0, util_1.getDateString)(), "][WS][").concat(ws.id, "] WebSocket connection has been established with guid."));
            }
            else {
                throw new Error('Unhandled PacketType!');
            }
            return [2 /*return*/];
        });
    });
};
var socketHandler = function socketHandler(ws, req) {
    winston_1.default.info("[".concat((0, util_1.getDateString)(), "][WS][null] WebSocket connection has been accepted."));
    ws.on('message', function (data) {
        handlePacket(ws, data.toString('utf-8')).catch(function (err) {
            winston_1.default.error(err.stack);
            ws.send(JSON.stringify({
                packetType: 'error',
                payload: err.message,
            }));
        });
    });
    ws.on('close', function () {
        Object.values(clients).forEach(function (item) {
            if (item.id === ws.id)
                return;
            item.send(JSON.stringify({
                packetType: 'left',
                payload: ws.id,
            }));
        });
        if (ws.id) {
            delete clients[ws.id];
        }
        winston_1.default.info("[".concat((0, util_1.getDateString)(), "][WS][").concat(ws.id, "] WebSocket connection has been disconnected."));
    });
};
exports.socketHandler = socketHandler;
exports.default = exports.socketHandler;
