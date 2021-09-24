"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const administrator_1 = __importDefault(require("../entities/administrator"));
class AdministratorDao {
    static async add(administrator) {
        try {
            const admin = await administrator_1.default.create({
                codeAccess: administrator.codeAccess,
                password: administrator.password,
            });
            return admin;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
    static async update(admin, oldAdmin) {
        try {
            const administrator = await administrator_1.default.update(admin, {
                where: { codeAccess: oldAdmin.codeAccess },
            });
            return administrator;
        }
        catch (err) {
            return null;
        }
    }
    static async search(id) {
        try {
            const admin = await administrator_1.default.findOne({ where: { codeAccess: id } });
            return admin;
        }
        catch (err) {
            return null;
        }
    }
}
exports.default = AdministratorDao;
