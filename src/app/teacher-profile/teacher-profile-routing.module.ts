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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherProfilePageRoutingModule {}
