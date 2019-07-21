import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReativeFormsModule } from '@angular/forms';

import { FieldBooleanComponent } from './field-boolean/field-boolean.component';
import { FieldCallbackComponent } from './field-callback/field-callback.component';
import { FieldComponent } from './field/field.component';
import { FieldBaseComponent } from './field-base/field-base.component';
import {
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';
import { FieldAssertComponent } from './field-assert/field-assert.component';

// Added to NgModule
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
// see https://codemirror.net/mode/index.html
import 'codemirror/mode/javascript/javascript';
import { FieldSelectComponent } from './field-select/field-select.component';
// import 'codemirror/mode/markdown/markdown';

@NgModule({
  declarations: [
    FieldBooleanComponent,
    FieldCallbackComponent,
    FieldComponent,
    FieldBaseComponent,
    FieldAssertComponent,
    FieldSelectComponent
  ],
  exports: [
    FieldBooleanComponent,
    FieldCallbackComponent,
    FieldComponent,
    FieldBaseComponent,
    FieldAssertComponent,
    FieldSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReativeFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    CodemirrorModule
  ],
  entryComponents: [
    FieldBooleanComponent,
    FieldCallbackComponent,
    FieldAssertComponent,
    FieldCallbackComponent,
    FieldSelectComponent
  ]
})
export class FormModule {}
