import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { CartListItemModule } from './cart-list-item/cart-list-item.module';
import { SdButtonGoldenModule } from 'src/app/components/sd-button-golden/sd-button-golden.module';
// import { StripePayModule } from 'src/app/stripe-pay/stripe-pay.module';

import { SwiperModule } from 'swiper/angular';
import { PaymentCardItemModule } from './payment-card-item/payment-card-item.module';
import { OrderDoneCardItemModule } from './order-done-card-item/order-done-card-item.module';
import { SdButtonClearModule } from '../../../components/sd-button-clear/sd-button-clear.module';
import { GlobalListViewModule } from 'src/app/components/global-list-view/global-list-view.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    SdHeaderTopModule,
    CartListItemModule,
    SdButtonGoldenModule,
    SwiperModule,
    // StripePayModule,
    PaymentCardItemModule,
    OrderDoneCardItemModule,
    SdButtonClearModule,
    GlobalListViewModule,

  ],
  declarations: [CartPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CartPageModule {}
