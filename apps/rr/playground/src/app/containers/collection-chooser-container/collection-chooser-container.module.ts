import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionChooserContainerComponent } from './collection-chooser-container.component';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReativeFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CollectionChooserContainerComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReativeFormsModule
  ],
  exports: [CollectionChooserContainerComponent]
})
export class CollectionChooserContainerModule {}
