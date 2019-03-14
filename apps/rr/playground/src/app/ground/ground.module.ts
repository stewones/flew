import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroundComponent } from './ground.component';
import { MatButtonModule } from '@angular/material';
import { ChainingPickerContainerModule } from '../containers/chaining-picker-container/chaining-picker-container.module';
import { ChainingApiContainerModule } from '../containers/chaining-api-container/chaining-api-container.module';

@NgModule({
  declarations: [GroundComponent],
  imports: [CommonModule, MatButtonModule, ChainingPickerContainerModule, ChainingApiContainerModule],
  exports: [GroundComponent]
})
export class GroundModule {}
