import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { teacherListResolver } from 'src/app/resolvers/student/teacherList.resolver';

import { StudentDashboradTeachersPage } from './student-dashborad-teachers.page';

const routes: Routes = [
  {
    path: '',
    component: StudentDashboradTeachersPage,
    resolve: {
      teacherList: teacherListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentDashboradTeachersPageRoutingModule {}
