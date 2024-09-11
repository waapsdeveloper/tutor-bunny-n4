import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatRequestsPage } from './chat-requests.page';

const routes: Routes = [
  {
    path: '',
    component: ChatRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRequestsPageRoutingModule {}
