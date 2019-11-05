import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContainedInPageComponent } from './contained-in-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContainedInPageComponent
  }
];

@NgModule({
  declarations: [ContainedInPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ContainedInPageComponent]
})
export class ContainedInPageModule { }