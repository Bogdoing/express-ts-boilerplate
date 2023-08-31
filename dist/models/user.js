"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
class user {
    constructor() {
        this.id = 'USER';
    }
    getUserId() {
        return this.id;
    }
    setUserId(id) {
        this.id = id;
    }
}
exports.user = user;
