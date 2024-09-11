import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherProfileEditPage } from './teacher-profile-edit.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherProfileEditPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherProfileEditPageRoutingModule {}
