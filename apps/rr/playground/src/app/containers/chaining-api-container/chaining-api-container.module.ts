import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChainingApiContainerComponent } from './chaining-api-container.component';

@NgModule({
  declarations: [ChainingApiContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [ChainingApiContainerComponent]
})
export class ChainingApiContainerModule { }
