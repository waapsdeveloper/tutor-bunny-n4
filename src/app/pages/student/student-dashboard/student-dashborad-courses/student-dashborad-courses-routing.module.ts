import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { courseListResolver } from 'src/app/resolvers/student/courseList.resolver';
import { trialListResolver } from 'src/app/resolvers/student/trialList.resolver';

import { StudentDashboradCoursesPage } from './student-dashborad-courses.page';

const routes: Routes = [
  {
    path: '',
    component: StudentDashboradCoursesPage,
    resolve: {
      courseList: courseListResolver,
      trialList: trialListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentDashboradCoursesPageRoutingModule {}
