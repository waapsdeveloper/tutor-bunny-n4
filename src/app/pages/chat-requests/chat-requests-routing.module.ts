import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { requestListResolver } from 'src/app/resolvers/teacher/requestList.resolver';

import { ChatRequestsPage } from './chat-requests.page';

const routes: Routes = [
  {
    path: '',
    component: ChatRequestsPage,
    resolve: {
      requestList: requestListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRequestsPageRoutingModule {}
