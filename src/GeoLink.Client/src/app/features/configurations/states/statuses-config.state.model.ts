import { FormStateModel } from '../../../shared/models/form-states.model';
import { StatusConfigFormGroup } from '../models/forms/status-config-form-group';
import { StatusConfigModel } from '../../../shared/models/status-config.model';

export interface StatusesConfigStateModel {
  configs: StatusConfigModel[];
  configFormGroup: FormStateModel<StatusConfigFormGroup>;
}
