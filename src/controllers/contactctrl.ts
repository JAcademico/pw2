import { Request, Response } from 'express';
import ContactDao from '../models/daos/contactdao';
import UserDao from '../models/daos/userdao';
import { getCookie, verifyToken } from '../utils/functions';
import { ContactI, UserI } from '../utils/interfaces';
import contactview from '../views/contactview';

export default class ContactCtrl {
  public static async add(req: Request, resp: Response): Promise<Response> {
    const { name, telephone } = req.body;
    const data = getCookie(req);
    if (data != null) {
      if (verifyToken(`${data.token}`)) {
        const contact = await ContactDao.add(
          { name: name, telephone: telephone },
          `${data.id}`,
        );
        if (contact != null) {
          return resp.status(201).json(contactview.render(contact as ContactI));
        }
        return resp.status(500).json({ MENSSAGEM: 'ERRO AO SALVAR CONTATO' });
      }
      return resp.status(500).json({ MENSSAGEM: 'ERRO AO SALVAR CONTATO' });
    }
    return resp.status(500).json({ MENSSAGEM: 'ERRO AO SALVAR CONTATO' });
  }

  public static async update(req: Request, resp: Response): Promise<Response> {
    const { id, name, telephone } = req.body;
    const data = getCookie(req);
    if (data != null) {
      if (verifyToken(`${data.token}`)) {
        const contactUpdate = await ContactDao.update({
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

  public static async search(req: Request, resp: Response): Promise<Response> {
    const data = getCookie(req);
    if (data != null) {
      if (verifyToken(`${data.token}`)) {
        const { id } = req.params;
        const contact = await ContactDao.search(Number(id));
        if (contact != null) {
          return resp.status(200).json(contactview.render(contact as ContactI));
        }
        return resp.status(500).json({ MENSAGEM: 'ERRO AO BUSCAR CONTATO' });
      }
      return resp.status(500).json({ MENSAGEM: 'ERRO AO BUSCAR CONTATO' });
    }
    return resp.status(500).json({ MENSAGEM: 'ERRO AO BUSCAR CONTATO' });
  }

  public static async delete(req: Request, resp: Response): Promise<Response> {
    const data = getCookie(req);
    if (data != null) {
      if (verifyToken(`${data.token}`)) {
        const { id } = req.params;
        const situation = await ContactDao.delete(Number(id));
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

  public static async list(req: Request, resp: Response): Promise<Response> {
    const data = getCookie(req);
    if (data != null) {
      if (verifyToken(`${data.token}`)) {
        const contacts = (await UserDao.listContacts(`${data.id}`)) as UserI;
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
