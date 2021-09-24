import { ContactI } from '../utils/interfaces';

export default {
  render(contact: ContactI): ContactI {
    return {
      id: contact.id,
      name: contact.name,
      telephone: contact.telephone,
    };
  },

  renderMany(contacts: ContactI[]): ContactI[] {
    return contacts.map(c => {
      return this.render(c);
    });
  },
};
