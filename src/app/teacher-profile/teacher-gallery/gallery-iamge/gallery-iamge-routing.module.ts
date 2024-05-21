import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryIamgePage } from './gallery-iamge.page';

const routes: Routes = [
  {
    path: '',
    component: GalleryIamgePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryIamgePageRoutingModule {}
