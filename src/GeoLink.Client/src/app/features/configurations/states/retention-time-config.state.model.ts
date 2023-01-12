import { FormStateModel } from '../../../shared/models/form-states.model';
import { RetentionTimeConfigFormGroup } from '../models/forms/retention-time-config-form-group';
import { RetentionTimeConfigModel } from '../models/retention-time-config.model';

export interface RetentionTimeConfigStateModel {
  config: RetentionTimeConfigModel;
  configFormGroup: FormStateModel<RetentionTimeConfigFormGroup>;
}
