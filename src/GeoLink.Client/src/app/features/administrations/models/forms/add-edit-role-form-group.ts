import { FormControl } from '@angular/forms';

export interface AddEditRoleFormGroup {
  id: FormControl<number | null>;
  name: FormControl<string>;
}
