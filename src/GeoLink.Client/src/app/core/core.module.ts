import { ErrorHandler, NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { NavigationComponent } from './ui/navigation/navigation.component';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { AppNgxsModule } from './modules/app-ngxs.module';
import { MapsState } from '../features/maps/states/maps.state';
import { IMapsService } from '../features/maps/services/maps.service.base';
import { MapsService } from '../features/maps/services/maps.service';
import { GlobalErrorHandler } from './interceptor/error-handler.interceptor';
import { DynamicComponentCreatorHelper } from '../features/maps/helpers/dynamic-component-creator.helper';
import { LoginComponent } from './ui/login/login/login.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [NavigationComponent, ToolbarComponent, LoginComponent],
  imports: [
    SharedModule,
    AppRoutingModule,
    AppNgxsModule,
    NgxsModule.forRoot([MapsState]),
    NgxsFormPluginModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
    },
    { provide: IMapsService, useClass: MapsService },
    DynamicComponentCreatorHelper,
  ],
})
export class CoreModule {}
