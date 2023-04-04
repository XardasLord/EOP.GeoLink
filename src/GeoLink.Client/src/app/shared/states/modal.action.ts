import { EnumDescriptionWithScopesModel } from '../models/enum-description-with-scopes.model';

const prefix = '[Modal]';

export class OpenEditPrivilegesDialogForGroup {
  constructor(public group?: EnumDescriptionWithScopesModel) {}

  static readonly type = `${prefix} ${OpenEditPrivilegesDialogForGroup.name}`;
}

export class OpenEditPrivilegesDialogForRole {
  constructor(public role?: EnumDescriptionWithScopesModel) {}

  static readonly type = `${prefix} ${OpenEditPrivilegesDialogForRole.name}`;
}

export class CloseEditPrivilegesDialogForGroup {
  static readonly type = `${prefix} ${CloseEditPrivilegesDialogForGroup.name}`;
}

export class CloseEditPrivilegesDialogForRole {
  static readonly type = `${prefix} ${CloseEditPrivilegesDialogForRole.name}`;
}
