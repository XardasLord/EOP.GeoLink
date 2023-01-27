import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './modules/material.module';
import { ModalState } from './states/modal.state';
import { EnumToDescriptionPipePipe } from './pipes/device-status-description.pipe';
import { ErrorService } from './errors/error.service';
import { MapAreaFiltersComponent } from './components/map-area-filters/map-area-filters.component';
import { MapObjectFiltersComponent } from './components/map-object-filters/map-object-filters.component';

@NgModule({
  declarations: [EnumToDescriptionPipePipe, MapAreaFiltersComponent, MapObjectFiltersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NgxsModule.forFeature([ModalState]),
    ToastrModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    EnumToDescriptionPipePipe,
    ToastrModule,
    MapAreaFiltersComponent,
    MapObjectFiltersComponent,
  ],
  providers: [ErrorService, { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }],
})
export class SharedModule {}
