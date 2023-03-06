import { AuthScopes } from '../auth/models/auth.scopes';

export interface EnumDescriptionWithScopesModel {
  id: number;
  name: string;
  description: string;
  authScopes: AuthScopes[];
}
