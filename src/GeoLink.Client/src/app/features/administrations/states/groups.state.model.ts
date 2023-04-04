import { GroupModel } from '../models/group.model';
import { EditPrivilegesFormGroup } from '../models/forms/edit-privileges-form-group';
import { FormStateModel } from '../../../shared/models/form-states.model';

export interface GroupsStateModel {
  groups: GroupModel[];
  editPrivilegesForm: FormStateModel<EditPrivilegesFormGroup>;
}
