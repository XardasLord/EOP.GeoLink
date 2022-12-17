import { RoleModel } from '../models/role.model';
import { FormStateModel } from '../../../shared/models/form-states.model';
import { AddNewGroupFormGroup } from '../models/forms/add-new-group-form-group';

export interface RolesStateModel {
  roles: RoleModel[];
  addEditRoleForm: FormStateModel<AddNewGroupFormGroup>;
}
