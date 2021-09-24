"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    reder(user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            active: user.active,
        };
    },
    renderMany(users) {
        return users.map(u => {
            return this.reder(u);
        });
    },
};
