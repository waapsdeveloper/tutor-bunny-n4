import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutHistoryPageRoutingModule } from './checkout-history-routing.module';

import { CheckoutHistoryPage } from './checkout-history.page';
import { SdHeaderTopModule } from "../../../components/sd-header-top/sd-header-top.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutHistoryPageRoutingModule,
    SdHeaderTopModule
],
  declarations: [CheckoutHistoryPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CheckoutHistoryPageModule {}
