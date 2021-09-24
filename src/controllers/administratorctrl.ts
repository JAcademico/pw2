import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import AdministratorDao from '../models/daos/administratordao';
import { AdministratorI } from '../utils/interfaces';
import { generateObjectAdmin, getAdmin } from '../utils/functions';
import administratorview from '../views/administratorview';

export default class AdministratorCtrl {
  public static async login(req: Request, resp: Response): Promise<Response> {
    const { codeAccess, password } = req.body;
    const admin = (await AdministratorDao.search(codeAccess)) as AdministratorI;

    if (admin != null) {
      const validePassword = await bcrypt.compare(
        password,
        `${admin.password}`,
      );
      console.log(admin);
      if (validePassword) {
        return resp
          .cookie(
            'admin_data',
            Buffer.from(
              JSON.stringify(await generateObjectAdmin(admin)),
            ).toString('base64'),
            {
              httpOnly: true,
              secure: false,
            },
          )
          .status(200)
          .json(administratorview.render(admin));
      }
      return resp.status(422).json({ MENSAGEM: 'SENHA INCORRETA' });
    }
    return resp.status(404).json({ MENSAGEM: 'ADMINISTRADOR NÃO EXISTE' });
  }

  public static async logout(req: Request, resp: Response): Promise<Response> {
    return resp
      .clearCookie('admin_data')
      .status(200)
      .json({ MENSAGEM: 'LOGOUT EFETUADO COM SUCESSO' });
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
    const { codeAccess, password } = req.body;
    const admin = getAdmin(req);
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
        return resp
          .cookie(
            'admin_data',
            Buffer.from(
              JSON.stringify(await generateObjectAdmin(setAdmin)),
            ).toString('base64'),
            {
              httpOnly: true,
              secure: false,
            },
          )
          .status(200)
          .json(administratorview.render(setAdmin));
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
