import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutHistoryDetailPageRoutingModule } from './checkout-history-detail-routing.module';

import { CheckoutHistoryDetailPage } from './checkout-history-detail.page';
import { SdHeaderTopModule } from "../../../components/sd-header-top/sd-header-top.module";
import { CartListItemModule } from "../cart/cart-list-item/cart-list-item.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutHistoryDetailPageRoutingModule,
    SdHeaderTopModule,
    CartListItemModule
],
  declarations: [CheckoutHistoryDetailPage]
})
export class CheckoutHistoryDetailPageModule {}
