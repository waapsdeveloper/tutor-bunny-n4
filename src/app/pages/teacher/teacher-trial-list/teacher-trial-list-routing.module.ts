import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherTrialListPage } from './teacher-trial-list.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherTrialListPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherTrialListPageRoutingModule {}
