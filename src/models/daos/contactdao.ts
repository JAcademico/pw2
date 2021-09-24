import { Model } from 'sequelize/types';
import { ContactI } from '../../utils/interfaces';
import Contact from '../entities/contact';

export default class ContactDao {
  public static async add(
    contact: ContactI,
    id: string,
  ): Promise<Model | null> {
    try {
      const cont = await Contact.create({
        name: contact.name,
        telephone: contact.telephone,
        userId: Number(id),
      });
      return cont;
    } catch (err) {
      return null;
    }
  }

  public static async update(
    contact: ContactI,
  ): Promise<[number, Model[]] | null> {
    try {
      const cont = await Contact.update(contact, { where: { id: contact.id } });
      return cont;
    } catch (err) {
      return null;
    }
  }

  public static async search(id: number): Promise<Model | null> {
    try {
      const contact = await Contact.findOne({ where: { id: id } });
      return contact;
    } catch (err) {
      return null;
    }
  }

  public static async delete(id: number): Promise<boolean> {
    try {
      await Contact.destroy({ where: { id: id } });
      return true;
    } catch (err) {
      return false;
    }
  }

  public static async list(): Promise<Model[] | null> {
    try {
      const contacts = Contact.findAll();
      return contacts;
    } catch (err) {
      return null;
    }
  }
}
