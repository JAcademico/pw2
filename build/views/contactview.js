"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(contact) {
        return {
            id: contact.id,
            name: contact.name,
            telephone: contact.telephone,
        };
    },
    renderMany(contacts) {
        return contacts.map(c => {
            return this.render(c);
        });
    },
};
