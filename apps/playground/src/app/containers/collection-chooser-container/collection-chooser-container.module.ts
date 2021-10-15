import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionChooserContainerComponent } from './collection-chooser-container.component';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CollectionChooserContainerComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CollectionChooserContainerComponent]
})
export class CollectionChooserContainerModule {}
