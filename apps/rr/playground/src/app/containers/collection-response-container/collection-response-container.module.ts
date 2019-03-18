import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionResponseModule } from '../../components/collection-response/collection-response.module';
import { CollectionResponseContainerComponent } from './collection-response-container.component';

@NgModule({
  declarations: [CollectionResponseContainerComponent],
  imports: [
    CommonModule,
    CollectionResponseModule
  ],
  exports: [CollectionResponseContainerComponent]
})
export class CollectionResponseContainerModule { }
