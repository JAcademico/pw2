"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const administratordao_1 = __importDefault(require("../models/daos/administratordao"));
const functions_1 = require("../utils/functions");
const administratorview_1 = __importDefault(require("../views/administratorview"));
class AdministratorCtrl {
    static async login(req, resp) {
        const { codeAccess, password } = req.body;
        const admin = (await administratordao_1.default.search(codeAccess));
        if (admin != null) {
            const validePassword = await bcrypt_1.default.compare(password, `${admin.password}`);
            console.log(admin);
            if (validePassword) {
                return resp
                    .cookie('admin_data', Buffer.from(JSON.stringify(await (0, functions_1.generateObjectAdmin)(admin))).toString('base64'), {
                    httpOnly: true,
                    secure: false,
                })
                    .status(200)
                    .json(administratorview_1.default.render(admin));
            }
            return resp.status(422).json({ MENSAGEM: 'SENHA INCORRETA' });
        }
        return resp.status(404).json({ MENSAGEM: 'ADMINISTRADOR NÃO EXISTE' });
    }
    static async logout(req, resp) {
        return resp
            .clearCookie('admin_data')
            .status(200)
            .json({ MENSAGEM: 'LOGOUT EFETUADO COM SUCESSO' });
    }
    static async add(req, resp) {
        const { codeAccess, password } = req.body;
        const jump = await bcrypt_1.default.genSalt(15);
        const hashPass = await bcrypt_1.default.hash(password, jump);
        const admin = (await administratordao_1.default.add({
            codeAccess: codeAccess,
            password: hashPass,
        }));
        if (admin != null) {
            return resp.status(201).json(administratorview_1.default.render(admin));
        }
        return resp.status(500).json({ MENSAGEM: 'ERRO AO SALVAR ADMINISTRADOR' });
    }
    static async update(req, resp) {
        const { codeAccess, password } = req.body;
        const admin = (0, functions_1.getAdmin)(req);
        if (admin != null) {
            const jump = await bcrypt_1.default.genSalt(15);
            const hashPass = await bcrypt_1.default.hash(password, jump);
            const newAdmin = await administratordao_1.default.update({
                codeAccess: codeAccess,
                password: hashPass,
            }, admin);
            if (newAdmin != null) {
                const setAdmin = (await administratordao_1.default.search(codeAccess));
                return resp
                    .cookie('admin_data', Buffer.from(JSON.stringify(await (0, functions_1.generateObjectAdmin)(setAdmin))).toString('base64'), {
                    httpOnly: true,
                    secure: false,
                })
                    .status(200)
                    .json(administratorview_1.default.render(setAdmin));
            }
            return resp
                .status(500)
                .json({ MENSAGEM: 'ERRO AO ATUALIZAR ADMINISTRADOR' });
        }
        return resp
            .status(500)
            .json({ MENSAGEM: 'ERRO AO ATUALIZAR ADMINISTRATOR' });
    }
}
exports.default = AdministratorCtrl;
