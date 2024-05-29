import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDatesPage } from './add-dates.page';

const routes: Routes = [
  {
    path: '',
    component: AddDatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDatesPageRoutingModule {}
