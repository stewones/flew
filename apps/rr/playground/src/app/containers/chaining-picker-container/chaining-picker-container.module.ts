import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChainingPickerContainerComponent } from './chaining-picker-container.component';
import { ChainingPickerModule } from '../../components/chaining-picker/chaining-picker.module';
import {
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChainingPickerContainerComponent],
  imports: [
    CommonModule,
    ChainingPickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ChainingPickerContainerComponent]
})
export class ChainingPickerContainerModule {}
