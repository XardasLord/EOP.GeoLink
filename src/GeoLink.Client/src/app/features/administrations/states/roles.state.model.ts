import { FormStateModel } from '../../../shared/models/form-states.model';
import { EditPrivilegesFormGroup } from '../models/forms/edit-privileges-form-group';

export interface RolesStateModel {
  addEditRoleForm: FormStateModel<EditPrivilegesFormGroup>;
}
