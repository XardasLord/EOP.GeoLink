import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

import { MaterialModule } from './modules/material.module';
import { ModalState } from './states/modal.state';
import { EnumToDescriptionPipePipe } from './pipes/device-status-description.pipe';

@NgModule({
  declarations: [EnumToDescriptionPipePipe],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, HttpClientModule, NgxsModule.forFeature([ModalState])],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    EnumToDescriptionPipePipe,
  ],
})
export class SharedModule {}
