import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CacheExplorerComponent } from './cache-explorer.component';

@NgModule({
  declarations: [CacheExplorerComponent],
  imports: [
    CommonModule
  ],
  exports: [CacheExplorerComponent]
})
export class CacheExplorerModule { }
