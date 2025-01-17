import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherMyEarningPage } from './teacher-my-earning.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherMyEarningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherMyEarningPageRoutingModule {}
