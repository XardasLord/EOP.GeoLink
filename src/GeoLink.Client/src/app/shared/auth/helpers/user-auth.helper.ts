import { User } from 'oidc-client';
import { UserAuthModel } from '../models/user-auth.model';
import { AuthScopes } from '../models/auth.scopes';

export class UserAuthHelper {
  public static parseUserAuthData(user: User): UserAuthModel | undefined {
    if (!user || !user.profile) {
      console.error('UserData not defined!');
      return undefined;
    }

    const output = new UserAuthModel({
      userName: user.profile.name,
      fullName: `${user.profile.given_name} ${user.profile.family_name}`,
      email: user.profile.email,
      role: user.profile['role'],
      accessToken: user.access_token,
      scopes: user.profile['auth_scopes'],
    });

    return output;
  }

  public static getScopes(keys: string[]): number[] {
    if (keys == null || keys.length === 0) {
      return [];
    }

    return keys.map(x => (AuthScopes as any)[x]);
  }
}
