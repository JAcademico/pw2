"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contactdao_1 = __importDefault(require("../models/daos/contactdao"));
const userdao_1 = __importDefault(require("../models/daos/userdao"));
const functions_1 = require("../utils/functions");
const contactview_1 = __importDefault(require("../views/contactview"));
class ContactCtrl {
    static async add(req, resp) {
        const { name, telephone } = req.body;
        const data = (0, functions_1.getCookie)(req);
        if (data != null) {
            if ((0, functions_1.verifyToken)(`${data.token}`)) {
                const contact = await contactdao_1.default.add({ name: name, telephone: telephone }, `${data.id}`);
                if (contact != null) {
                    return resp.status(201).json(contactview_1.default.render(contact));
                }
                return resp.status(500).json({ MENSSAGEM: 'ERRO AO SALVAR CONTATO' });
            }
            return resp.status(500).json({ MENSSAGEM: 'ERRO AO SALVAR CONTATO' });
        }
        return resp.status(500).json({ MENSSAGEM: 'ERRO AO SALVAR CONTATO' });
    }
    static async update(req, resp) {
        const { id, name, telephone } = req.body;
        const data = (0, functions_1.getCookie)(req);
        if (data != null) {
            if ((0, functions_1.verifyToken)(`${data.token}`)) {
                const contactUpdate = await contactdao_1.default.update({
                    id: id,
                    name: name,
                    telephone: telephone,
                });
                if (contactUpdate != null) {
                    return resp.status(204).json({ MENSAGEM: 'CONTATO ATUALIZADO' });
                }
                return resp.status(500).json({ MENSAGEM: 'ERRO AO ATUALIZAR CONTATO' });
            }
            return resp.status(500).json({ MENSAGEM: 'ERRO AO ATUALIZAR CONTATO' });
        }
        return resp.status(500).json({ MENSAGEM: 'ERRO AO ATUALIZAR CONTATO' });
    }
    static async search(req, resp) {
        const data = (0, functions_1.getCookie)(req);
        if (data != null) {
            if ((0, functions_1.verifyToken)(`${data.token}`)) {
                const { id } = req.params;
                const contact = await contactdao_1.default.search(Number(id));
                if (contact != null) {
                    return resp.status(200).json(contactview_1.default.render(contact));
                }
                return resp.status(500).json({ MENSAGEM: 'ERRO AO BUSCAR CONTATO' });
            }
            return resp.status(500).json({ MENSAGEM: 'ERRO AO BUSCAR CONTATO' });
        }
        return resp.status(500).json({ MENSAGEM: 'ERRO AO BUSCAR CONTATO' });
    }
    static async delete(req, resp) {
        const data = (0, functions_1.getCookie)(req);
        if (data != null) {
            if ((0, functions_1.verifyToken)(`${data.token}`)) {
                const { id } = req.params;
                const situation = await contactdao_1.default.delete(Number(id));
                if (situation) {
                    return resp
                        .status(204)
                        .json({ MENSAGEM: 'CONTATO EXCLUIDO COM SUCESSO' });
                }
                return resp.status(500).json({ MENSAGEM: 'ERRO AO EXCLUIR CONTATO' });
            }
            return resp.status(500).json({ MENSAGEM: 'ERRO AO EXCLUIR CONTATO' });
        }
        return resp.status(500).json({ MENSAGEM: 'ERRO AO EXCLUIR CONTATO' });
    }
    static async list(req, resp) {
        const data = (0, functions_1.getCookie)(req);
        if (data != null) {
            if ((0, functions_1.verifyToken)(`${data.token}`)) {
                const contacts = (await userdao_1.default.listContacts(`${data.id}`));
                if (contacts != null) {
                    return resp.status(200).json(contacts.contacts);
                }
                return resp
                    .status(500)
                    .json({ MENSAGEM: 'ERRO AO RECUPERAR CONTATOS' });
            }
            return resp.status(500).json({ MENSAGEM: 'ERRO AO RECUPERAR CONTATOS' });
        }
        return resp.status(500).json({ MENSAGEM: 'ERRO AO RECUPERAR CONTATOS' });
    }
}
exports.default = ContactCtrl;
