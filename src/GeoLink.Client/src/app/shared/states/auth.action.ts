const prefix = '[Auth]';

export class Login {
  static readonly type = `${prefix} ${Login.name}`;
  constructor(public login: string, public password: string) {}
}
