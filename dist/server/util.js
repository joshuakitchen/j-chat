"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateString = void 0;
function getDateString(date) {
    if (typeof date === 'undefined') {
        date = new Date(Date.now());
    }
    return "".concat(date.getDate(), "/").concat(date.getMonth(), "/").concat(date.getFullYear(), " ").concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds());
}
exports.getDateString = getDateString;
