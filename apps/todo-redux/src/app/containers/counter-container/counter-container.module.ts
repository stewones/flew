import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterContainerComponent } from './counter-container.component';

@NgModule({
  declarations: [CounterContainerComponent],
  imports: [CommonModule],
  exports: [CounterContainerComponent]
})
export class CounterContainerModule { }