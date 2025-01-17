import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherCreditsPage } from './teacher-credits.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherCreditsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherCreditsPageRoutingModule {}
