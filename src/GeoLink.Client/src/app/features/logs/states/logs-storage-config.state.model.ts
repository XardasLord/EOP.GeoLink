import { FormStateModel } from '../../../shared/models/form-states.model';
import { LogsStorageConfigModel } from '../models/logs-storage-config.model';
import { LogsStorageConfigFormGroup } from '../models/forms/logs-storage-config-form-group';

export interface LogsStorageConfigStateModel {
  config: LogsStorageConfigModel;
  configFormGroup: FormStateModel<LogsStorageConfigFormGroup>;
}
