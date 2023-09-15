import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { SystemsAvailabilityStateModel } from './systems-availability.state.model';
import { RestQueryVo } from '../../../shared/models/pagination/rest.query';
import { RestQueryResponseWithoutPaginationVo } from '../../../shared/models/pagination/rest.response';
import { SystemAvailabilityModel } from '../models/system-availability.model';
import { LoadSystemAvailabilities, LoadSystemDataFields } from './systems-availability.action';
import { SystemsAvailabilityService } from '../services/systems-availability.service';
import { SystemDataFieldModel } from '../models/system-data-field.model';

const SYSTEMS_AVAILABILITY_STATE_TOKEN = new StateToken<SystemsAvailabilityStateModel>('systemsAvailability');

@State<SystemsAvailabilityStateModel>({
  name: SYSTEMS_AVAILABILITY_STATE_TOKEN,
  defaults: {
    restQuery: new RestQueryVo(),
    restQueryResponseSystemsAvailability: new RestQueryResponseWithoutPaginationVo<SystemAvailabilityModel[]>(),
    restQueryResponseSystemsDataFields: new RestQueryResponseWithoutPaginationVo<SystemDataFieldModel[]>(),
  },
})
@Injectable()
export class SystemsAvailabilityState {
  constructor(private systemsAvailabilityService: SystemsAvailabilityService) {}

  @Selector([SYSTEMS_AVAILABILITY_STATE_TOKEN])
  static getSystemsAvailability(state: SystemsAvailabilityStateModel): SystemAvailabilityModel[] {
    return state.restQueryResponseSystemsAvailability.result;
  }

  @Selector([SYSTEMS_AVAILABILITY_STATE_TOKEN])
  static getSystemsDataFields(state: SystemsAvailabilityStateModel): SystemDataFieldModel[] {
    return state.restQueryResponseSystemsDataFields.result;
  }

  @Action(LoadSystemAvailabilities)
  loadSystemAvailabilities(ctx: StateContext<SystemsAvailabilityStateModel>) {
    return this.systemsAvailabilityService.loadSystemsAvailability().pipe(
      tap(response => {
        const customResponse = new RestQueryResponseWithoutPaginationVo<SystemAvailabilityModel[]>();
        customResponse.result = response;

        ctx.patchState({
          restQueryResponseSystemsAvailability: customResponse,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(LoadSystemDataFields)
  loadSystemDataFields(ctx: StateContext<SystemsAvailabilityStateModel>) {
    return this.systemsAvailabilityService.loadSystemDataFields().pipe(
      tap(response => {
        const customResponse = new RestQueryResponseWithoutPaginationVo<SystemDataFieldModel[]>();
        customResponse.result = response;

        ctx.patchState({
          restQueryResponseSystemsDataFields: customResponse,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
