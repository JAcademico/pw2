import { UserI } from '../utils/interfaces';

export default {
  reder(user: UserI): UserI {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      active: user.active,
    };
  },
  renderMany(users: UserI[]): UserI[] {
    return users.map(u => {
      return this.reder(u);
    });
  },
};
