import { FormStateModel } from '../../../shared/models/form-states.model';
import { DiagnosticToolsConfigModel } from '../models/diagnostic-tools-config.model';
import { DiagnosticToolsConfigFormGroup } from '../models/forms/diagnostic-tools-config-form-group';

export interface DiagnosticToolsConfigStateModel {
  config: DiagnosticToolsConfigModel;
  configFormGroup: FormStateModel<DiagnosticToolsConfigFormGroup>;
}
