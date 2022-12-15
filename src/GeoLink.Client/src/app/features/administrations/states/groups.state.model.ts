import { GroupModel } from '../models/group.model';
import { AddNewGroupFormGroup } from '../models/add-new-group-form-group';
import { FormStateModel } from '../../../shared/models/form-states.model';

export interface GroupsStateModel {
  groups: GroupModel[];
  addNewGroupForm: FormStateModel<AddNewGroupFormGroup>;
}
