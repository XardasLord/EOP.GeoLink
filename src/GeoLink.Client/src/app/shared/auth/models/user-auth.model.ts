import { AuthScopes } from './auth.scopes';

export class UserAuthModel {
  userName!: string;
  fullName: string | undefined;
  email: string | undefined;
  role: string | undefined;
  accessToken: string | undefined;
  scopes: AuthScopes[] | undefined;

  constructor(init?: Partial<UserAuthModel>) {
    Object.assign(this, { ...init });
  }
}
