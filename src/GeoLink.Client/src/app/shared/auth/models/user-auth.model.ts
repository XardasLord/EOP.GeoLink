import { AuthScopes } from './auth.scopes';

export class UserAuthModel {
  unique_name!: string;
  userName!: string;
  fullName: string | undefined;
  email: string | undefined;
  role: string | undefined;
  auth_scopes: AuthScopes[] | undefined;
  regions: number[] | undefined;
  groups: number | undefined;
  init_objecttypefilters: number | undefined;
  init_devicefilters: number[] | undefined;
  init_regionfilters: number[] | undefined;
  init_statusfilters: number[] | undefined;

  constructor(init?: Partial<UserAuthModel>) {
    Object.assign(this, { ...init });
  }
}
