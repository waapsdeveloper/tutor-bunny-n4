import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrailRequestsPageRoutingModule } from './trail-requests-routing.module';

import { TrailRequestsPage } from './trail-requests.page';
import { TrailCardModule } from '../my-students/trail-card/trail-card.module';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';

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
export class TrailRequestsPageModule { }
