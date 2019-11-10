import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionLogContainerComponent } from './collection-log-container.component';
import { CollectionLogModule } from '../../components/collection-log/collection-log.module';

@NgModule({
  declarations: [CollectionLogContainerComponent],
  imports: [
    CommonModule,
    CollectionLogModule
  ],
  exports: [CollectionLogContainerComponent]
})
export class CollectionLogContainerModule { }
