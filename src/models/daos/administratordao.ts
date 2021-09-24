import { Model } from 'sequelize/types';
import { AdministratorI } from '../../utils/interfaces';
import Administrator from '../entities/administrator';

export default class AdministratorDao {
  public static async add(
    administrator: AdministratorI,
  ): Promise<Model | null> {
    try {
      const admin = await Administrator.create({
        codeAccess: administrator.codeAccess,
        password: administrator.password,
      });
      return admin;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async update(
    admin: AdministratorI,
    oldAdmin: AdministratorI,
  ): Promise<[number, Model[]] | null> {
    try {
      const administrator = await Administrator.update(admin, {
        where: { codeAccess: oldAdmin.codeAccess },
      });
      return administrator;
    } catch (err) {
      return null;
    }
  }

  public static async search(id: string): Promise<Model | null> {
    try {
      const admin = await Administrator.findOne({ where: { codeAccess: id } });
      return admin;
    } catch (err) {
      return null;
    }
  }
}
