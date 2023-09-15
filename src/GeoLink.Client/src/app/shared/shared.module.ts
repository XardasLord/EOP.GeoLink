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
import { AuthService } from './services/auth.service';
import { AuthScopeAllowDirective } from './auth/directives/auth-scope-allow.directive';
import { DictionaryService } from './services/dictionary.service';
import { DictionaryState } from './states/dictionary.state';
import { EnumDescriptionPipePipe } from './pipes/enum-description.pipe';
import { AlertState } from './states/alert.state';
import { AlertService } from './services/alert.service';
import { SingleDeviceAttributeChartComponent } from './components/single-device-attribute-chart/single-device-attribute-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartService } from './services/chart.service';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from './services/progress-spinner.service';
import { SingleChartDialogComponent } from './components/dialogs/single-chart-dialog/single-chart-dialog.component';
import { SimpleInputDialogComponent } from './components/dialogs/simple-input-dialog/simple-input-dialog.component';
import { FiltersState } from './states/filters.state';
import { QuickFiltersDialogComponent } from './components/dialogs/quick-filters-dialog/quick-filters-dialog.component';
import { QuickFilterService } from './services/quick-filter.service';
import { MapCheckboxFiltersComponent } from './components/map-checkbox-filters/map-checkbox-filters.component';

@NgModule({
  declarations: [
    EnumDescriptionPipePipe,
    MapRegionFiltersComponent,
    MapCheckboxFiltersComponent,
    AuthScopeAllowDirective,
    SingleDeviceAttributeChartComponent,
    SingleChartDialogComponent,
    ProgressSpinnerComponent,
    SimpleInputDialogComponent,
    QuickFiltersDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NgxsModule.forFeature([ModalState, DictionaryState, AlertState, FiltersState]),
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
    MapCheckboxFiltersComponent,
    SingleDeviceAttributeChartComponent,
    SingleChartDialogComponent,
    ProgressSpinnerComponent,
    NgOptimizedImage,
    NgxEchartsModule,
    SimpleInputDialogComponent,
  ],
  providers: [
    ErrorService,
    AuthService,
    DictionaryService,
    AlertService,
    ChartService,
    ProgressSpinnerService,
    QuickFilterService,
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
      'search',
      'close',
    ];

    svgIconFiles.forEach(iconFileName => {
      const iconPath = `${directoryPath}/${iconFileName}.svg`;
      this.matIconRegistry.addSvgIcon(iconFileName, this.domSanitizer.bypassSecurityTrustResourceUrl(iconPath));
    });
  }
}
