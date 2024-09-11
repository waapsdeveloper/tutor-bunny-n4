import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleBasePage } from './role-base.page';

const routes: Routes = [
  {
    path: '',
    component: RoleBasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleBasePageRoutingModule {}
