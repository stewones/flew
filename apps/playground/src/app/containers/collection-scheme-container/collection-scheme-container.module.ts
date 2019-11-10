import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionSchemeModule } from '../../components/collection-scheme/collection-scheme.module';
import { CollectionSchemeContainerComponent } from './collection-scheme-container.component';

@NgModule({
  declarations: [CollectionSchemeContainerComponent],
  imports: [CommonModule, CollectionSchemeModule],
  exports: [CollectionSchemeContainerComponent]
})
export class CollectionSchemeContainerModule {}
