import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsPage } from './notifications.page';
import { userResolver } from 'src/app/resolvers/user.resolver';
import { notificationListResolver } from 'src/app/resolvers/notificationList.resolver';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPage,
    resolve: {
      list: notificationListResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsPageRoutingModule {}
