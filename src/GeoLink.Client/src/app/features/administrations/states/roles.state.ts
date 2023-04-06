import { Injectable } from '@angular/core';
import { State, StateToken } from '@ngxs/store';
import { RolesStateModel } from './roles.state.model';
import { DefaultFormStateValue } from '../../../shared/models/form-states.model';
import { RolesService } from '../services/roles.service';

const ROLES_STATE_TOKEN = new StateToken<RolesStateModel>('roles');

@State<RolesStateModel>({
  name: ROLES_STATE_TOKEN,
  defaults: {
    addEditRoleForm: DefaultFormStateValue,
  },
})
@Injectable()
export class RolesState {
  constructor(private rolesService: RolesService) {}
}
