import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavMaterialPage } from './fav-material.page';

const routes: Routes = [
  {
    path: '',
    component: FavMaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavMaterialPageRoutingModule {}
