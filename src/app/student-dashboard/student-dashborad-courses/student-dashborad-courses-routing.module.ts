import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentDashboradCoursesPage } from './student-dashborad-courses.page';

const routes: Routes = [
  {
    path: '',
    component: StudentDashboradCoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentDashboradCoursesPageRoutingModule {}
