import messagEmail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';
import { Request } from 'express';
import { AdministratorI, UserI } from './interfaces';
import UserDao from '../models/daos/userdao';

dotEnv.config({ path: `${__dirname}/../.env` });

const generateToken = async (id: string): Promise<string> => {
  return jwt.sign({ id: id }, `${process.env.SECRET_KEY}`, {
    expiresIn: 7200,
  });
};

const validadeAccount = async (codeAccess: string): Promise<boolean> => {
  const user = await UserDao.updateAccessId(codeAccess);
  console.log(user);
  return true;
};

const verifyToken = (token: string): boolean => {
  let result = false;
  jwt.verify(token, `${process.env.SECRET_KEY}`, err => {
    if (!err) {
      result = true;
    }
  });
  return result;
};

const sendEmail = async (user: UserI): Promise<void> => {
  messagEmail.setApiKey(`${process.env.API_EMAILKEY}`);
  const message = {
    to: user.email,
    from: 'contatemeinc@gmail.com',
    subject: 'Email de Confirmação',
    text: 'Acesse o link para acessar a sua conta',
    html: `<h2>Click no link para validar a sua conta</h2>
     <br/>
     <a href='http://localhost:8080/user/validate/${user.codeAccess}'>Click para validar</a>`,
  };
  try {
    await messagEmail.send(message);
  } catch (err) {
    console.log(err);
  }
};

const getCookie = (req: Request): UserI | null => {
  const data = String(req.cookies.user_data);
  if (data.length > 0) {
    return JSON.parse(Buffer.from(data, 'base64').toString('ascii')) as UserI;
  }
  return null;
};

const getAdmin = (req: Request): AdministratorI | null => {
  const data = String(req.cookies.admin_data);
  if (data === 'undefined') {
    return null;
  }
  if (data.length > 0) {
    return JSON.parse(
      Buffer.from(data, 'base64').toString('ascii'),
    ) as AdministratorI;
  }
  return null;
};

const generateObject = async (user: UserI): Promise<UserI> => {
  return {
    id: user.id,
    email: user.email,
    token: await generateToken(`${user.id}`),
  };
};

const generateObjectAdmin = async (
  admin: AdministratorI,
): Promise<AdministratorI> => {
  return {
    id: admin.id,
    codeAccess: admin.codeAccess,
    token: await generateToken(`${admin.id}`),
  };
};

export {
  validadeAccount,
  sendEmail,
  generateObject,
  verifyToken,
  getCookie,
  generateObjectAdmin,
  getAdmin,
};
