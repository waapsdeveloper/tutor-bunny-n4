import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMaterialPhotosPage } from './create-material-photos.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMaterialPhotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMaterialPhotosPageRoutingModule {}
