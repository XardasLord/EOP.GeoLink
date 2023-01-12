import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

import { MaterialModule } from './modules/material.module';
import { ModalState } from './states/modal.state';
import { EnumToDescriptionPipePipe } from './pipes/device-status-description.pipe';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [EnumToDescriptionPipePipe],
  imports: [
    CommonModule,
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
  ],
})
export class SharedModule {}
