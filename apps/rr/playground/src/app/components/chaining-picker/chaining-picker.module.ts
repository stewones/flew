import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChainingPickerComponent } from './chaining-picker.component';
import { FormModule } from '../form/form.module';

@NgModule({
  declarations: [ChainingPickerComponent],
  imports: [CommonModule, FormModule],
  exports: [ChainingPickerComponent]
})
export class ChainingPickerModule {}
