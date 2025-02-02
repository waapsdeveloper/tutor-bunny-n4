import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseFormPage } from './course-form.page';

const routes: Routes = [
  {
    path: '',
    component: CourseFormPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseFormPageRoutingModule {}
