import { FormControl } from '@angular/forms';

export interface RetentionTimeConfigFormGroup {
  historicalDataStoragePeriod: FormControl<number>;
  actionAfterRetentionTimePassed: FormControl<number>;
}
