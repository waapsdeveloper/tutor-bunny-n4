import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentProfileEditPage } from './student-profile-edit.page';

const routes: Routes = [
  {
    path: '',
    component: StudentProfileEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentProfileEditPageRoutingModule {}
