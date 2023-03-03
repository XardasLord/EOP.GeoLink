export interface UserModel {
  login: string;
  name: string;
  surname: string;
  role: string;
  groups: string[] | null;
  regions: string[] | null;
}
