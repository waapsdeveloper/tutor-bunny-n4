import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutHistoryDetailPage } from './checkout-history-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutHistoryDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutHistoryDetailPageRoutingModule {}
