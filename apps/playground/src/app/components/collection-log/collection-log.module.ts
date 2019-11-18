import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionLogComponent } from './collection-log.component';

@NgModule({
  declarations: [CollectionLogComponent],
  imports: [
    CommonModule
  ],
  exports: [CollectionLogComponent]
})
export class CollectionLogModule { }
