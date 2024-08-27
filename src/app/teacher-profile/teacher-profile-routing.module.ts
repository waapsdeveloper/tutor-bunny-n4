import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherProfilePage } from './teacher-profile.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherProfilePage
  },
  {
    path: 'teacher-profile-edit',
    loadChildren: () => import('./teacher-profile-edit/teacher-profile-edit.module').then( m => m.TeacherProfileEditPageModule)
  },
  {
    path: 'teacher-gallery',
    loadChildren: () => import('./teacher-gallery/teacher-gallery.module').then( m => m.TeacherGalleryPageModule)
  },
  {
    path: 'reviews-by-student',
    loadChildren: () => import('../reviews-by-student/reviews-by-student.module').then( m => m.ReviewsByStudentPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherProfilePageRoutingModule {}
