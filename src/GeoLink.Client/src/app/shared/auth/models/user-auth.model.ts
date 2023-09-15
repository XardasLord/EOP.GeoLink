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
  init_objectfilterids!: number;
  init_devicefilterids!: number[];
  init_regionfilterids!: number[];
  init_statusfilterids!: number[];

  constructor(init?: Partial<UserAuthModel>) {
    Object.assign(this, { ...init });
  }
}
