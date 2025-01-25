import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherMaterialDetailPage } from './teacher-material-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherMaterialDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherMaterialDetailPageRoutingModule {}
