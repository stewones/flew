import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionSchemeComponent } from './collection-scheme.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CollectionSchemeComponent],
  imports: [CommonModule, CodemirrorModule, FormsModule],
  exports: [CollectionSchemeComponent]
})
export class CollectionSchemeModule {}
