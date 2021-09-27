import messagEmail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';
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
     <a href='https://apipw2if.herokuapp.com/user/validate/${user.codeAccess}'>Click para validar</a>`,
  };
  try {
    await messagEmail.send(message);
  } catch (err) {
    console.log(err);
  }
};

const criptObjectUser = (user: UserI): string => {
  return Buffer.from(JSON.stringify(user)).toString('base64');
};

const criptObjectAdmin = (admin: AdministratorI): string => {
  return Buffer.from(JSON.stringify(admin)).toString('base64');
};

const decryptObject = (token: string): UserI | AdministratorI => {
  return JSON.parse(Buffer.from(token, 'base64').toString('ascii'));
};

export {
  validadeAccount,
  sendEmail,
  verifyToken,
  generateToken,
  criptObjectAdmin,
  criptObjectUser,
  decryptObject,
};
