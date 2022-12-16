import { FormControl } from '@angular/forms';

export interface EditGroupFormGroup {
  id: FormControl<number>;
  name: FormControl<string>;
}
