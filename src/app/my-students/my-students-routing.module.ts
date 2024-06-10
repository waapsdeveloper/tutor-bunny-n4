import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStudentsPage } from './my-students.page';

const routes: Routes = [
  {
    path: '',
    component: MyStudentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStudentsPageRoutingModule {}
