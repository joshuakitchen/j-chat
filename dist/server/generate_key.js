'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var fs_1 = __importDefault(require("fs"));
function main() {
    crypto_1.default.randomBytes(48, function (err, buffer) {
        if (err) {
            console.error(err);
        }
        else {
            fs_1.default.writeFileSync('/var/chat.key', buffer.toString('hex'));
        }
    });
}
main();
