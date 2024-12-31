import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailMaterialPage } from './detail-material.page';

const routes: Routes = [
  {
    path: '',
    component: DetailMaterialPage
  },  {
    path: 'material-photo',
    loadChildren: () => import('./material-photo/material-photo.module').then( m => m.MaterialPhotoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailMaterialPageRoutingModule {}
