'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var fs_1 = __importDefault(require("fs"));
var winston_1 = __importDefault(require("winston"));
exports.config = {
    admin_key: fs_1.default.readFileSync('/var/chat.key', 'utf-8'),
    logger: {
        transports: [
            new winston_1.default.transports.Console()
        ],
        format: winston_1.default.format.combine(winston_1.default.format.simple(), winston_1.default.format.colorize())
    }
};
exports.default = exports.config;
