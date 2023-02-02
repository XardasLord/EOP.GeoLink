import { isDevMode, NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AuthState } from '../../shared/states/auth.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([], {
      developmentMode: isDevMode(),
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false,
      },
    }),
    NgxsModule.forFeature([AuthState]),
    NgxsLoggerPluginModule.forRoot({
      collapsed: false,
      disabled: !isDevMode(),
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'GeoLink',
      disabled: !isDevMode(),
    }),
    NgxsRouterPluginModule.forRoot(),
  ],
  exports: [NgxsReduxDevtoolsPluginModule],
})
export class AppNgxsModule {}
