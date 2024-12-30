import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMaterialDocsPage } from './create-material-docs.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMaterialDocsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMaterialDocsPageRoutingModule {}
