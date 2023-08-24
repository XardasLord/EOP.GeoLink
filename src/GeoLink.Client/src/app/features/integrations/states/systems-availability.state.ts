import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { SystemsAvailabilityStateModel } from './systems-availability.state.model';
import { RestQueryVo } from '../../../shared/models/pagination/rest.query';
import { RestQueryResponseWithoutPaginationVo } from '../../../shared/models/pagination/rest.response';
import { SystemAvailabilityModel } from '../models/system-availability.model';
import { Load } from './systems-availability.action';
import { SystemsAvailabilityService } from '../services/systems-availability.service';

const SYSTEMS_AVAILABILITY_STATE_TOKEN = new StateToken<SystemsAvailabilityStateModel>('systemsAvailability');

@State<SystemsAvailabilityStateModel>({
  name: SYSTEMS_AVAILABILITY_STATE_TOKEN,
  defaults: {
    restQuery: new RestQueryVo(),
    restQueryResponse: new RestQueryResponseWithoutPaginationVo<SystemAvailabilityModel[]>(),
  },
})
@Injectable()
export class SystemsAvailabilityState {
  constructor(private systemsAvailabilityService: SystemsAvailabilityService) {}

  @Selector([SYSTEMS_AVAILABILITY_STATE_TOKEN])
  static getSystemsAvailability(state: SystemsAvailabilityStateModel): SystemAvailabilityModel[] {
    return state.restQueryResponse.result;
  }

  @Action(Load)
  loadSystemsAvailability(ctx: StateContext<SystemsAvailabilityStateModel>) {
    return this.systemsAvailabilityService.load().pipe(
      tap(response => {
        const customResponse = new RestQueryResponseWithoutPaginationVo<SystemAvailabilityModel[]>();
        customResponse.result = response;

        ctx.patchState({
          restQueryResponse: customResponse,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
