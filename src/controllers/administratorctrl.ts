import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import AdministratorDao from '../models/daos/administratordao';
import { AdministratorI } from '../utils/interfaces';
import administratorview from '../views/administratorview';
import {
  criptObjectAdmin,
  decryptObject,
  generateToken,
} from '../utils/functions';

export default class AdministratorCtrl {
  public static async login(req: Request, resp: Response): Promise<Response> {
    const { codeAccess, password } = req.body;
    const admin = (await AdministratorDao.search(codeAccess)) as AdministratorI;

    if (admin != null) {
      admin.token = await generateToken(String(admin.id));
      const validePassword = await bcrypt.compare(
        password,
        `${admin.password}`,
      );

      if (validePassword) {
        return resp
          .status(200)
          .json({ token: criptObjectAdmin(administratorview.render(admin)) });
      }
      return resp.status(422).json({ MENSAGEM: 'SENHA INCORRETA' });
    }
    return resp.status(404).json({ MENSAGEM: 'ADMINISTRADOR NÃO EXISTE' });
  }

  public static async add(req: Request, resp: Response): Promise<Response> {
    const { codeAccess, password } = req.body;
    const jump = await bcrypt.genSalt(15);
    const hashPass = await bcrypt.hash(password, jump);
    const admin = (await AdministratorDao.add({
      codeAccess: codeAccess,
      password: hashPass,
    })) as AdministratorI;

    if (admin != null) {
      return resp.status(201).json(administratorview.render(admin));
    }
    return resp.status(500).json({ MENSAGEM: 'ERRO AO SALVAR ADMINISTRADOR' });
  }

  public static async update(req: Request, resp: Response): Promise<Response> {
    const { codeAccess, password, token } = req.body;
    const admin = decryptObject(token) as AdministratorI;
    if (admin != null) {
      const jump = await bcrypt.genSalt(15);
      const hashPass = await bcrypt.hash(password, jump);
      const newAdmin = await AdministratorDao.update(
        {
          codeAccess: codeAccess,
          password: hashPass,
        },
        admin,
      );
      if (newAdmin != null) {
        const setAdmin = (await AdministratorDao.search(
          codeAccess,
        )) as AdministratorI;
        setAdmin.token = admin.token;
        return resp.status(200).json({
          token: criptObjectAdmin(administratorview.render(setAdmin)),
        });
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
