import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserDao from '../models/daos/userdao';
import { UserI } from '../utils/interfaces';
import userview from '../views/userview';
import {
  criptObjectUser,
  generateToken,
  sendEmail,
  validadeAccount,
} from '../utils/functions';

export default class UserCtrl {
  public static async add(req: Request, resp: Response): Promise<Response> {
    const { username, email, password } = req.body;
    const resultSearch = await UserDao.search(email);
    if (resultSearch != null) {
      return resp
        .status(400)
        .json({ MENSAGEM: 'USUÁRIO COM E-MAIL JÁ CADASTRADO' });
    }
    const jump = await bcrypt.genSalt(15);
    const hashPass = await bcrypt.hash(password, jump);
    const result = await UserDao.add({
      username: username,
      email: email,
      password: hashPass,
    });
    await sendEmail(result as UserI);
    return resp.status(201).json(userview.reder(result as UserI));
  }

  public static async delete(req: Request, resp: Response): Promise<Response> {
    const { id } = req.params;

    const result = await UserDao.delete(id);

    if (result != null) {
      return resp.status(200).json({ MENSAGEM: 'USUÁRIO EXCLUIDO' });
    }
    return resp.status(500).json({ MENSAGEM: 'ERRO AO EXCLUIR USUÁRIO' });
  }

  public static async list(req: Request, resp: Response): Promise<Response> {
    const users = (await UserDao.list()) as UserI[];
    if (users != null) {
      return resp.status(200).json(userview.renderMany(users));
    }
    return resp.status(500).json({ MENSAGEM: 'IMPOSSÍVEL LISTAR USUÁRIOS' });
  }

  public static async login(req: Request, resp: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = (await UserDao.search(email)) as UserI;
    if (user != null) {
      user.token = await generateToken(String(user.id));
      const validePassword = await bcrypt.compare(
        password,
        String(user.password),
      );
      if (validePassword && user.active) {
        console.log(user);
        return resp
          .status(200)
          .json({ token: criptObjectUser(userview.reder(user)) });
      }
      return resp
        .status(400)
        .json({ MENSAGEM: 'SENHA INCORRETA OU USUÁRIO NÃO EXISTE' });
    }
    return resp.status(404).json({ MENSAGEM: 'USUÁRIO NÃO EXISTE' });
  }

  public static async validateAccount(
    req: Request,
    resp: Response,
  ): Promise<Response> {
    const { id } = req.params;
    await validadeAccount(id);
    return resp.status(200).json({ MENSAGEM: 'USUARIO VALIDADO' });
  }
}
