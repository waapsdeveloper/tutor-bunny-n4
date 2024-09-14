import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsPage } from './notifications.page';
import { userResolver } from 'src/app/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPage,
    resolve: {
      user: userResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsPageRoutingModule {}
