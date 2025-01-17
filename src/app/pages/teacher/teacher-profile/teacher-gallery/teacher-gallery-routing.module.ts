import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherGalleryPage } from './teacher-gallery.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherGalleryPage
  },
  
  {
    path: 'gallery-image',
    loadChildren: () => import('./gallery-image/gallery-image.module').then( m => m.GalleryImagePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherGalleryPageRoutingModule {}
