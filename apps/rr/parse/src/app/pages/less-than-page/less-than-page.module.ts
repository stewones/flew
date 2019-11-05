import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LessThanPageComponent } from './less-than-page.component';

const routes: Routes = [
  {
    path: '',
    component: LessThanPageComponent
  }
];

@NgModule({
  declarations: [LessThanPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [LessThanPageComponent]
})
export class LessThanPageModule { }