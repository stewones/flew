import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CacheExplorerContainerComponent } from './cache-explorer-container.component';
import { CacheExplorerModule } from '../../components/cache-explorer/cache-explorer.module';

@NgModule({
  declarations: [CacheExplorerContainerComponent],
  imports: [CommonModule, CacheExplorerModule],
  exports: [CacheExplorerContainerComponent]
})
export class CacheExplorerContainerModule {}
