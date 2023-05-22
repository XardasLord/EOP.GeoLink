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

@NgModule({
  declarations: [
    EnumDescriptionPipePipe,
    MapRegionFiltersComponent,
    MapObjectFiltersComponent,
    MapStatusFiltersComponent,
    AuthScopeAllowDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NgxsModule.forFeature([ModalState, DictionaryState]),
    ToastrModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    EnumDescriptionPipePipe,
    ToastrModule,
    MapRegionFiltersComponent,
    MapObjectFiltersComponent,
    MapStatusFiltersComponent,
    AuthScopeAllowDirective,
  ],
  providers: [
    ErrorService,
    AuthService,
    DictionaryService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
})
export class SharedModule {}
