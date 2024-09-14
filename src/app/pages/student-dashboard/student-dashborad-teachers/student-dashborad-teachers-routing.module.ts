import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentDashboradTeachersPage } from './student-dashborad-teachers.page';

const routes: Routes = [
  {
    path: '',
    component: StudentDashboradTeachersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentDashboradTeachersPageRoutingModule {}
