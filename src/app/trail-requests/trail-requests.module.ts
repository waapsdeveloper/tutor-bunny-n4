import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrailRequestsPageRoutingModule } from './trail-requests-routing.module';

import { TrailRequestsPage } from './trail-requests.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { TrailCardModule } from './trail-card/trail-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrailRequestsPageRoutingModule,
    SdHeaderTopModule,
    TrailCardModule
  ],
  declarations: [TrailRequestsPage]
})
export class TrailRequestsPageModule {}
