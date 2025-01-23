import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherCreditsBuyPage } from './teacher-credits-buy.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherCreditsBuyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherCreditsBuyPageRoutingModule {}
