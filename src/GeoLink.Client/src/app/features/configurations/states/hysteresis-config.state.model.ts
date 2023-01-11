import { FormStateModel } from '../../../shared/models/form-states.model';
import { HysteresisConfigFormGroup } from '../models/forms/hysteresis-config-form-group';
import { HysteresisConfigModel } from '../models/hysteresis-config.model';

export interface HysteresisConfigStateModel {
  config: HysteresisConfigModel;
  configFormGroup: FormStateModel<HysteresisConfigFormGroup>;
}
