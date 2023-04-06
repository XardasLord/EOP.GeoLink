import { AuthScopes } from '../../../shared/auth/models/auth.scopes';

const prefix = '[Roles]';

export class EditPrivileges {
  constructor(public roleId: number, public scopes: AuthScopes[]) {}

  static readonly type = `${prefix} ${EditPrivileges.name}`;
}
