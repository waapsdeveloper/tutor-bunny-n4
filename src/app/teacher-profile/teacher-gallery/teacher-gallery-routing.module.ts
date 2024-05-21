import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherGalleryPage } from './teacher-gallery.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherGalleryPage
  },  {
    path: 'gallery-iamge',
    loadChildren: () => import('./gallery-iamge/gallery-iamge.module').then( m => m.GalleryIamgePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherGalleryPageRoutingModule {}
