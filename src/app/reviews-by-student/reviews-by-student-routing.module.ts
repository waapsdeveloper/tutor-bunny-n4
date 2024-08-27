import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewsByStudentPage } from './reviews-by-student.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewsByStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewsByStudentPageRoutingModule {}
