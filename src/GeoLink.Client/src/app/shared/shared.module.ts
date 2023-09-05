import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
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
import { ChartService } from './services/chart.service';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from './services/progress-spinner.service';
import { SingleChartDialogComponent } from './components/single-chart-dialog/single-chart-dialog.component';
import { MapDeviceFiltersComponent } from './components/map-device-filters/map-device-filters.component';

@NgModule({
  declarations: [
    EnumDescriptionPipePipe,
    MapRegionFiltersComponent,
    MapObjectFiltersComponent,
    MapDeviceFiltersComponent,
    MapStatusFiltersComponent,
    AuthScopeAllowDirective,
    SingleDeviceChartComponent,
    SingleChartDialogComponent,
    ProgressSpinnerComponent,
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
    NgOptimizedImage,
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
    MapDeviceFiltersComponent,
    MapStatusFiltersComponent,
    SingleDeviceChartComponent,
    SingleChartDialogComponent,
    ProgressSpinnerComponent,
    NgOptimizedImage,
    NgxEchartsModule,
  ],
  providers: [
    ErrorService,
    AuthService,
    DictionaryService,
    AlertService,
    ChartService,
    ProgressSpinnerService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
})
export class SharedModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.registerSvgIcons('assets/icons');
  }

  private registerSvgIcons(directoryPath: string) {
    const svgIconFiles = [
      'map',
      'menu',
      'face',
      'flag',
      'filter_alt',
      'logout',
      'notifications',
      'bar_chart',
      'description',
      'psychology',
      'settings',
      'construction',
      'lan',
      'desktop_windows',
      'manage_accounts',
      'groups',
      'edit',
      'timer',
      'hourglass_bottom',
      'show_chart',
      'stethoscope',
      'home',
      'traffic',
      'layers',
      'circle',
      'shuffle',
      'calculate',
      'menu_book',
      'geolink_logo',
    ];

    svgIconFiles.forEach(iconFileName => {
      const iconPath = `${directoryPath}/${iconFileName}.svg`;
      this.matIconRegistry.addSvgIcon(iconFileName, this.domSanitizer.bypassSecurityTrustResourceUrl(iconPath));
    });
  }
}
