import { RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

const routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home-page.module').then(m => m.HomePageModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/edit/edit-page.module').then(m => m.EditPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutesModule {}
