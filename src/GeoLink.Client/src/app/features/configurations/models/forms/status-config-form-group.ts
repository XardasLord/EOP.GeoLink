import { FormControl } from '@angular/forms';

export interface StatusConfigFormGroup {
  id: FormControl<number | null>;
  sourceStatus: FormControl<string | null>;
  description: FormControl<string | null>;
  geoLinkStatus: FormControl<number | null>;
}
