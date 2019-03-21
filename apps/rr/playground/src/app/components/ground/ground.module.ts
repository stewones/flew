import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroundComponent } from './ground.component';
import { MatButtonModule } from '@angular/material';
import { ChainingPickerContainerModule } from '../../containers/chaining-picker-container/chaining-picker-container.module';
import { ChainingApiContainerModule } from '../../containers/chaining-api-container/chaining-api-container.module';
import { ChainingApiModule } from '../chaining-api/chaining-api.module';
import { CollectionChooserContainerModule } from '../../containers/collection-chooser-container/collection-chooser-container.module';
import { CollectionResponseContainerModule } from '../../containers/collection-response-container/collection-response-container.module';
import { CacheExplorerContainerModule } from '../../containers/cache-explorer-container/cache-explorer-container.module';
import { CollectionSchemeContainerModule } from '../../containers/collection-scheme-container/collection-scheme-container.module';
import { VerbChooserContainerModule } from '../../containers/verb-chooser-container/verb-chooser-container.module';

@NgModule({
  declarations: [GroundComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ChainingPickerContainerModule,
    ChainingApiContainerModule,
    ChainingApiModule,
    CollectionChooserContainerModule,
    CollectionResponseContainerModule,
    CacheExplorerContainerModule,
    CollectionSchemeContainerModule,
    VerbChooserContainerModule
  ],
  exports: [GroundComponent]
})
export class GroundModule {}
