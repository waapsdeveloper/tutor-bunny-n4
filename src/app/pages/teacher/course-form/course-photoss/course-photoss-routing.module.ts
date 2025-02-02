import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursePhotossPage } from './course-photoss.page';

const routes: Routes = [
  {
    path: '',
    component: CoursePhotossPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursePhotossPageRoutingModule {}
