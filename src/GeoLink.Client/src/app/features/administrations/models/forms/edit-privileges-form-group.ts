import { FormControl } from '@angular/forms';
import { AuthScopes } from '../../../../shared/auth/models/auth.scopes';

export interface EditPrivilegesFormGroup {
  scopes: FormControl<AuthScopes[]>;
}
