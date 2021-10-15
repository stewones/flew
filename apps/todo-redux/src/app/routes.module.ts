import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  //
  // login
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/edit/edit-page.module').then(m => m.EditPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class RoutesModule {}
