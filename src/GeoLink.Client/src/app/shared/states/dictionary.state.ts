import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { DictionaryStateModel } from './dictionary.state.model';
import { EnumDescriptionModel } from '../models/enum-description.model';
import { DictionaryService } from '../services/dictionary.service';
import {
  GetConfigDefinitions,
  GetDeviceGroupsRelation,
  GetMapDeviceTypes,
  GetMapObjectStatusTypes,
  GetMapObjectTypes,
  GetSystemGroups,
  GetSystemPermissions,
  GetSystemRegions,
  GetSystemRoles,
  GetTimeExtentDefinitions,
} from './dictionary.action';
import { EnumDescriptionWithScopesModel } from '../models/enum-description-with-scopes.model';
import { EnumDescriptionRegionModel } from '../models/enum-description-region.model';
import { DeviceGroupRelationModel } from '../models/device-group-relation.model';
import { append, patch } from '@ngxs/store/operators';
import { ConfigDefinitionModel } from '../models/config/config-definition.model';

export const DICTIONARY_STATE_TOKEN = new StateToken<DictionaryStateModel>('dictionary');

@State<DictionaryStateModel>({
  name: DICTIONARY_STATE_TOKEN,
  defaults: {
    systemGroups: [],
    systemRoles: [],
    systemRegions: [],
    systemPermissions: [],
    mapObjectTypes: [],
    mapDeviceTypes: [],
    mapObjectStatusTypes: [],
    deviceGroupsRelation: [],
    timeExtentDefinitions: [],
    configDefinitions: [],
  },
})
@Injectable()
export class DictionaryState {
  constructor(private dictionaryService: DictionaryService) {}

  @Selector([DICTIONARY_STATE_TOKEN])
  static getSystemGroups(state: DictionaryStateModel): EnumDescriptionWithScopesModel[] {
    return state.systemGroups;
  }

  @Selector([DICTIONARY_STATE_TOKEN])
  static getSystemRoles(state: DictionaryStateModel): EnumDescriptionWithScopesModel[] {
    return state.systemRoles;
  }

  @Selector([DICTIONARY_STATE_TOKEN])
  static getSystemRegions(state: DictionaryStateModel): EnumDescriptionRegionModel[] {
    return state.systemRegions;
  }

  @Selector([DICTIONARY_STATE_TOKEN])
  static getSystemPermissions(state: DictionaryStateModel): EnumDescriptionModel[] {
    return state.systemPermissions;
  }

  @Selector([DICTIONARY_STATE_TOKEN])
  static getMapObjectTypes(state: DictionaryStateModel): EnumDescriptionModel[] {
    return state.mapObjectTypes;
  }

  @Selector([DICTIONARY_STATE_TOKEN])
  static getMapDeviceTypes(state: DictionaryStateModel): EnumDescriptionModel[] {
    return state.mapDeviceTypes;
  }

  @Selector([DICTIONARY_STATE_TOKEN])
  static getMapObjectStatusTypes(state: DictionaryStateModel): EnumDescriptionModel[] {
    return state.mapObjectStatusTypes;
  }

  @Selector([DICTIONARY_STATE_TOKEN])
  static getDeviceGroupsRelation(state: DictionaryStateModel): DeviceGroupRelationModel[] {
    return state.deviceGroupsRelation;
  }

  @Selector([DICTIONARY_STATE_TOKEN])
  static getTimeExtentDefinitions(state: DictionaryStateModel): EnumDescriptionModel[] {
    return state.timeExtentDefinitions;
  }

  @Selector([DICTIONARY_STATE_TOKEN])
  static getConfigDefinitions(state: DictionaryStateModel): ConfigDefinitionModel[] {
    return state.configDefinitions;
  }

  @Action(GetSystemGroups)
  getSystemGroups(ctx: StateContext<DictionaryStateModel>, _: GetSystemGroups) {
    return this.dictionaryService.getSystemGroups().pipe(
      tap(response => {
        ctx.patchState({
          systemGroups: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(GetSystemRoles)
  getSystemRoles(ctx: StateContext<DictionaryStateModel>, _: GetSystemRoles) {
    return this.dictionaryService.getSystemRoles().pipe(
      tap(response => {
        ctx.patchState({
          systemRoles: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(GetSystemRegions)
  getSystemRegions(ctx: StateContext<DictionaryStateModel>, _: GetSystemRegions) {
    return this.dictionaryService.getSystemRegions().pipe(
      tap(response => {
        ctx.patchState({
          systemRegions: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(GetSystemPermissions)
  getSystemPermissions(ctx: StateContext<DictionaryStateModel>, _: GetSystemPermissions) {
    return this.dictionaryService.getSystemPermission().pipe(
      tap(response => {
        ctx.patchState({
          systemPermissions: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(GetMapObjectTypes)
  getMapObjectTypes(ctx: StateContext<DictionaryStateModel>, _: GetMapObjectTypes) {
    return this.dictionaryService.getMapObjectTypes().pipe(
      tap(response => {
        ctx.patchState({
          mapObjectTypes: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(GetMapDeviceTypes)
  getMapDeviceTypes(ctx: StateContext<DictionaryStateModel>, _: GetMapDeviceTypes) {
    return this.dictionaryService.getMapDeviceTypes().pipe(
      tap(response => {
        ctx.patchState({
          mapDeviceTypes: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(GetMapObjectStatusTypes)
  getMapObjectStatusTypes(ctx: StateContext<DictionaryStateModel>, _: GetMapObjectStatusTypes) {
    return this.dictionaryService.getMapObjectStatusTypes().pipe(
      tap(response => {
        ctx.patchState({
          mapObjectStatusTypes: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(GetDeviceGroupsRelation)
  getDeviceGroupsRelation(ctx: StateContext<DictionaryStateModel>, _: GetDeviceGroupsRelation) {
    return this.dictionaryService.getDeviceGroupsRelation().pipe(
      tap(response => {
        ctx.patchState({
          deviceGroupsRelation: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(GetTimeExtentDefinitions)
  getTimeExtentDefinitions(ctx: StateContext<DictionaryStateModel>, _: GetTimeExtentDefinitions) {
    return this.dictionaryService.getTimeExtentParameterDefinitions().pipe(
      tap(response => {
        ctx.patchState({
          timeExtentDefinitions: response,
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  @Action(GetConfigDefinitions)
  getConfigDefinitions(ctx: StateContext<DictionaryStateModel>, _: GetConfigDefinitions) {
    return this.dictionaryService.getConfigDefinitions().pipe(
      tap(response => {
        console.warn(response);
        ctx.setState(
          patch<DictionaryStateModel>({
            configDefinitions: append<ConfigDefinitionModel>(response),
          })
        );
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
