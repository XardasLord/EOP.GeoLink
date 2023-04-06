import { AuthScopes } from '../../../shared/auth/models/auth.scopes';

const prefix = '[Groups]';

export class EditPrivileges {
  constructor(public groupId: number, public scopes: AuthScopes[]) {}

  static readonly type = `${prefix} ${EditPrivileges.name}`;
}
