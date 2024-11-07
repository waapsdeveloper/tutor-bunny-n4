import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesPage } from './messages.page';
import { userResolver } from 'src/app/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: MessagesPage,
    resolve: {
      user: userResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesPageRoutingModule {}
