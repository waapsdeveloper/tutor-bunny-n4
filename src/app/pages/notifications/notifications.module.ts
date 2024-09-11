import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsPageRoutingModule } from './notifications-routing.module';

import { NotificationsPage } from './notifications.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { NotificationBoxModule } from './notification-box/notification-box.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule,
    SdHeaderTopModule,
    NotificationBoxModule
  ],
  declarations: [NotificationsPage]
})
export class NotificationsPageModule {}
