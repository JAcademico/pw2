import { Model } from 'sequelize/types';
import { v4 as uuid } from 'uuid';
import { UserI } from '../../utils/interfaces';
import Contact from '../entities/contact';
import User from '../entities/user';

export default class UserDao {
  public static async add(user: UserI): Promise<Model | null> {
    try {
      const us = await User.create({
        username: user.username,
        email: user.email,
        password: user.password,
        codeAccess: uuid(),
      });
      return us;
    } catch (err) {
      return null;
    }
  }

  public static async delete(id: string): Promise<number | null> {
    try {
      const user = await User.destroy({ where: { id: Number(id) } });
      return user;
    } catch (err) {
      return null;
    }
  }

  public static async search(id: string): Promise<Model | null> {
    try {
      const user = await User.findOne({ where: { email: id } });
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async list(): Promise<Model[] | null> {
    try {
      const users = await User.findAll();
      return users;
    } catch (err) {
      return null;
    }
  }

  public static async updateAccessId(id: string): Promise<Model | null> {
    try {
      const user = (await User.findOne({ where: { codeAccess: id } })) as UserI;
      user.active = true;
      const newUser = user as Model;
      newUser.save();
      return newUser;
    } catch (err) {
      return null;
    }
  }

  public static async listContacts(id: string): Promise<Model | null> {
    try {
      return await User.findByPk(id, {
        include: [{ model: Contact, as: 'contacts' }],
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
