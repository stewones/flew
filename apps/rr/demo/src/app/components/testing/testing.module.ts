import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestingComponent } from './testing.component';

@NgModule({
  declarations: [TestingComponent],
  imports: [CommonModule],
  exports: [TestingComponent]
})
export class TestingModule { }