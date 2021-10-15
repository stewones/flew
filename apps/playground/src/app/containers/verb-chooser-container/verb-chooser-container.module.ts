import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerbChooserContainerComponent } from './verb-chooser-container.component';
import {
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [VerbChooserContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [VerbChooserContainerComponent]
})
export class VerbChooserContainerModule {}
