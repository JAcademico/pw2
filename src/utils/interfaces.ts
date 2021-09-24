interface ContactI {
  id?: number;
  name?: string;
  telephone?: string;
}

interface AdministratorI {
  id?: number;
  codeAccess?: string;
  password?: string;
  token?: string;
}

interface UserI {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  active?: boolean;
  codeAccess?: string;
  auth?: boolean;
  token?: string;
  contacts?: ContactI[];
}

export { UserI, ContactI, AdministratorI };
