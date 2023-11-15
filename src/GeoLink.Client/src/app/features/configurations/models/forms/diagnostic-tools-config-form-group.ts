import { FormControl } from '@angular/forms';

export interface DiagnosticToolsConfigFormGroup {
  consoleSshHostname: FormControl<string>;
  websitePolkomtel: FormControl<string>;
  websiteTMobile: FormControl<string>;
}
