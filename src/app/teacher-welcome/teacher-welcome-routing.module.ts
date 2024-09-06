import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherWelcomePage } from './teacher-welcome.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherWelcomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherWelcomePageRoutingModule {}
