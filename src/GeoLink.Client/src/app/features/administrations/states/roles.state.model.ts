import { RoleModel } from '../models/role.model';
import { FormStateModel } from '../../../shared/models/form-states.model';
import { EditPrivilegesFormGroup } from '../models/forms/edit-privileges-form-group';

export interface RolesStateModel {
  roles: RoleModel[];
  addEditRoleForm: FormStateModel<EditPrivilegesFormGroup>;
}
