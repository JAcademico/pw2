"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = __importDefault(require("../entities/contact"));
class ContactDao {
    static async add(contact, id) {
        try {
            const cont = await contact_1.default.create({
                name: contact.name,
                telephone: contact.telephone,
                userId: Number(id),
            });
            return cont;
        }
        catch (err) {
            return null;
        }
    }
    static async update(contact) {
        try {
            const cont = await contact_1.default.update(contact, { where: { id: contact.id } });
            return cont;
        }
        catch (err) {
            return null;
        }
    }
    static async search(id) {
        try {
            const contact = await contact_1.default.findOne({ where: { id: id } });
            return contact;
        }
        catch (err) {
            return null;
        }
    }
    static async delete(id) {
        try {
            await contact_1.default.destroy({ where: { id: id } });
            return true;
        }
        catch (err) {
            return false;
        }
    }
    static async list() {
        try {
            const contacts = contact_1.default.findAll();
            return contacts;
        }
        catch (err) {
            return null;
        }
    }
}
exports.default = ContactDao;
