import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChainingPickerContainerComponent } from './chaining-picker-container.component';
import { ChainingPickerModule } from '../../components/chaining-picker/chaining-picker.module';

@NgModule({
  declarations: [ChainingPickerContainerComponent],
  imports: [CommonModule, ChainingPickerModule],
  exports: [ChainingPickerContainerComponent]
})
export class ChainingPickerContainerModule {}
