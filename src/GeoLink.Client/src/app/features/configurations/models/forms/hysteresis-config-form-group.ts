import { FormControl } from '@angular/forms';

export interface HysteresisConfigFormGroup {
  availabilityThresholdPercentage: FormControl<number>;
  sensitivenessPercentage: FormControl<number>;
}
