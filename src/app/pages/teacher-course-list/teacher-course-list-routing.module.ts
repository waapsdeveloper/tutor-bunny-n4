import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherCourseListPage } from './teacher-course-list.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherCourseListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherCourseListPageRoutingModule {}
