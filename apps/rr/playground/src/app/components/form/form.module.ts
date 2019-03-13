import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FieldBooleanComponent } from './field-boolean/field-boolean.component';
import { FieldCallbackComponent } from './field-callback/field-callback.component';
import { FieldComponent } from './field/field.component';
import { FieldBaseComponent } from './field-base/field-base.component';

@NgModule({
  declarations: [
    FieldBooleanComponent,
    FieldCallbackComponent,
    FieldComponent,
    FieldBaseComponent
  ],
  exports: [
    FieldBooleanComponent,
    FieldCallbackComponent,
    FieldComponent,
    FieldBaseComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  entryComponents: [FieldBooleanComponent, FieldCallbackComponent]
})
export class FormModule {}
