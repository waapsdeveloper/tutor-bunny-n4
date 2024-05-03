import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentMenuPage } from './student-menu.page';

const routes: Routes = [
  {
    path: '',
    component: StudentMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentMenuPageRoutingModule {}
