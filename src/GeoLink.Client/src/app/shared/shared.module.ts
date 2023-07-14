import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './modules/material.module';
import { ModalState } from './states/modal.state';
import { ErrorService } from './errors/error.service';
import { MapRegionFiltersComponent } from './components/map-region-filters/map-region-filters.component';
import { MapObjectFiltersComponent } from './components/map-object-filters/map-object-filters.component';
import { AuthService } from './services/auth.service';
import { AuthScopeAllowDirective } from './auth/directives/auth-scope-allow.directive';
import { DictionaryService } from './services/dictionary.service';
import { DictionaryState } from './states/dictionary.state';
import { EnumDescriptionPipePipe } from './pipes/enum-description.pipe';
import { MapStatusFiltersComponent } from './components/map-status-filters/map-status-filters.component';
import { AlertState } from './states/alert.state';
import { AlertService } from './services/alert.service';
import { SingleDeviceChartComponent } from './components/single-device-chart/single-device-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DeviceChartService } from './services/device-chart.service';
import { MapIpFiltersComponent } from './components/map-ip-filters/map-ip-filters.component';

@NgModule({
  declarations: [
    EnumDescriptionPipePipe,
    MapRegionFiltersComponent,
    MapObjectFiltersComponent,
    MapStatusFiltersComponent,
    MapIpFiltersComponent,
    AuthScopeAllowDirective,
    SingleDeviceChartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NgxsModule.forFeature([ModalState, DictionaryState, AlertState]),
    ToastrModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    EnumDescriptionPipePipe,
    ToastrModule,
    AuthScopeAllowDirective,
    MapRegionFiltersComponent,
    MapObjectFiltersComponent,
    MapStatusFiltersComponent,
    MapIpFiltersComponent,
    SingleDeviceChartComponent,
  ],
  providers: [
    ErrorService,
    AuthService,
    DictionaryService,
    AlertService,
    DeviceChartService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
})
export class SharedModule {}
