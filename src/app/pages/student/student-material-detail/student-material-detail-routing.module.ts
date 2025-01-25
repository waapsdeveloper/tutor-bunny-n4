import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentMaterialDetailPage } from './student-material-detail.page';

const routes: Routes = [
  {
    path: '',
    component: StudentMaterialDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentMaterialDetailPageRoutingModule {}
