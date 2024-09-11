import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrailRequestsPage } from './trail-requests.page';

const routes: Routes = [
  {
    path: '',
    component: TrailRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrailRequestsPageRoutingModule {}
