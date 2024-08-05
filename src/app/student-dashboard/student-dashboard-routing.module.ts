import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentDashboardPage } from './student-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: StudentDashboardPage
  },
  {
    path: 'student-menu',
    loadChildren: () => import('./student-menu/student-menu.module').then(m => m.StudentMenuPageModule)
  },
  {
    path: 'student-profile-edit',
    loadChildren: () => import('./student-profile-edit/student-profile-edit.module').then(m => m.StudentProfileEditPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentDashboardPageRoutingModule { }
