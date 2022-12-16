import { GroupModel } from '../models/group.model';
import { AddNewGroupFormGroup } from '../models/forms/add-new-group-form-group';
import { FormStateModel } from '../../../shared/models/form-states.model';
import { EditGroupFormGroup } from '../models/forms/edit-group-form-group';

export interface GroupsStateModel {
  groups: GroupModel[];
  addNewGroupForm: FormStateModel<AddNewGroupFormGroup>;
  editGroupForm: FormStateModel<EditGroupFormGroup>;
}
