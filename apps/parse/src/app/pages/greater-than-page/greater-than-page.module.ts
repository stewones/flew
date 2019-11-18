import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GreaterThanPageComponent } from './greater-than-page.component';

const routes: Routes = [
  {
    path: '',
    component: GreaterThanPageComponent
  }
];

@NgModule({
  declarations: [GreaterThanPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [GreaterThanPageComponent]
})
export class GreaterThanPageModule { }