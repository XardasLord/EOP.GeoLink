import { AuthScopes } from './auth.scopes';

export class UserAuthModel {
  unique_name!: string;
  userName!: string;
  fullName: string | undefined;
  email: string | undefined;
  role: string | undefined;
  auth_scopes: AuthScopes[] | undefined;

  constructor(init?: Partial<UserAuthModel>) {
    Object.assign(this, { ...init });
  }
}
