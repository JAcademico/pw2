import { AdministratorI } from '../utils/interfaces';

export default {
  render(admin: AdministratorI): AdministratorI {
    return {
      id: admin.id,
      codeAccess: admin.codeAccess,
      token: admin.token,
    };
  },
};
