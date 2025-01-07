import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CsmatTabsPage } from './csmat-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: CsmatTabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CsmatTabsPageRoutingModule {}
