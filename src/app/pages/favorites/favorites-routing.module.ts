import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritesPage } from './favorites.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritesPage,
    children: [
      {
        path: 'fav-courses',
        loadChildren: () => import('./fav-courses/fav-courses.module').then( m => m.FavCoursesPageModule)
      },
      {
        path: 'fav-material',
        loadChildren: () => import('./fav-material/fav-material.module').then( m => m.FavMaterialPageModule)
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesPageRoutingModule {}
