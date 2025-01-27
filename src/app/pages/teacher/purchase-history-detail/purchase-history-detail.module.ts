import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseHistoryDetailPageRoutingModule } from './purchase-history-detail-routing.module';

import { PurchaseHistoryDetailPage } from './purchase-history-detail.page';
import { SdHeaderTopModule } from "../../../components/sd-header-top/sd-header-top.module";
import { CartListItemModule } from "./cart-list-item/cart-list-item.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseHistoryDetailPageRoutingModule,
    SdHeaderTopModule,
    CartListItemModule
],
  declarations: [PurchaseHistoryDetailPage]
})
export class PurchaseHistoryDetailPageModule {}
