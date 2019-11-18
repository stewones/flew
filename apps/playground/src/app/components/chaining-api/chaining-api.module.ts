import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChainingApiComponent } from './chaining-api.component';

@NgModule({
  declarations: [ChainingApiComponent],
  imports: [
    CommonModule
  ],
  exports: [ChainingApiComponent]
})
export class ChainingApiModule { }
