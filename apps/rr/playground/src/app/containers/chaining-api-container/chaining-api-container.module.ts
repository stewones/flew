import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChainingApiContainerComponent } from './chaining-api-container.component';
import { ChainingApiModule } from '../../components/chaining-api/chaining-api.module';

@NgModule({
  declarations: [ChainingApiContainerComponent],
  imports: [CommonModule, ChainingApiModule],
  exports: [ChainingApiContainerComponent]
})
export class ChainingApiContainerModule {}
