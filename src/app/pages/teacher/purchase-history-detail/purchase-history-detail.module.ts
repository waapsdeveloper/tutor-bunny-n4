import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseHistoryDetailPageRoutingModule } from './purchase-history-detail-routing.module';

import { PurchaseHistoryDetailPage } from './purchase-history-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseHistoryDetailPageRoutingModule
  ],
  declarations: [PurchaseHistoryDetailPage]
})
export class PurchaseHistoryDetailPageModule {}
