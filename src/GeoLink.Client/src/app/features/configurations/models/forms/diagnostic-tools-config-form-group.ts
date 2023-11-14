import { FormControl } from '@angular/forms';

export interface DiagnosticToolsConfigFormGroup {
  prtgUrl: FormControl<string>;
  consoleSshHostname: FormControl<string>;
  websitePolkomtel: FormControl<string>;
  websiteTMobile: FormControl<string>;
}
