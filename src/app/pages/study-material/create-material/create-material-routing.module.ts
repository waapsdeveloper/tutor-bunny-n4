import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMaterialPage } from './create-material.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMaterialPageRoutingModule {}
