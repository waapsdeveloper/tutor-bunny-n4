import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentDashboardStudyMaterialPage } from './student-dashboard-study-material.page';

const routes: Routes = [
  {
    path: '',
    component: StudentDashboardStudyMaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentDashboardStudyMaterialPageRoutingModule {}
