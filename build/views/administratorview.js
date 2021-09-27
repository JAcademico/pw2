"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(admin) {
        return {
            id: admin.id,
            codeAccess: admin.codeAccess,
            token: admin.token,
        };
    },
};
