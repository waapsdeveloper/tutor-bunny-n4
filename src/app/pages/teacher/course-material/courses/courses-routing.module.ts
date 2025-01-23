import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { courseListResolver } from 'src/app/resolvers/teacher/courseList.resolver';

import { CoursesPage } from './courses.page';

const routes: Routes = [
  {
    path: '',
    component: CoursesPage,
    resolve: {
      courseList: courseListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesPageRoutingModule {}
