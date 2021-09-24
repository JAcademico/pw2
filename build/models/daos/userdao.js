"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const contact_1 = __importDefault(require("../entities/contact"));
const user_1 = __importDefault(require("../entities/user"));
class UserDao {
    static async add(user) {
        try {
            const us = await user_1.default.create({
                username: user.username,
                email: user.email,
                password: user.password,
                codeAccess: (0, uuid_1.v4)(),
            });
            return us;
        }
        catch (err) {
            return null;
        }
    }
    static async search(id) {
        try {
            const user = await user_1.default.findOne({ where: { email: id } });
            return user;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
    static async list() {
        try {
            const users = await user_1.default.findAll();
            return users;
        }
        catch (err) {
            return null;
        }
    }
    static async updateAccessId(id) {
        try {
            const user = (await user_1.default.findOne({ where: { codeAccess: id } }));
            user.active = true;
            const newUser = user;
            newUser.save();
            return newUser;
        }
        catch (err) {
            return null;
        }
    }
    static async listContacts(id) {
        try {
            return await user_1.default.findByPk(id, {
                include: [{ model: contact_1.default, as: 'contacts' }],
            });
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
}
exports.default = UserDao;
