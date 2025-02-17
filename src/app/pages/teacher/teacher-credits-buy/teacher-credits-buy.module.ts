import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherCreditsBuyPageRoutingModule } from './teacher-credits-buy-routing.module';

import { TeacherCreditsBuyPage } from './teacher-credits-buy.page';
import { SwiperModule } from 'swiper/angular';
import { SdHeaderTopModule } from "../../../components/sd-header-top/sd-header-top.module";
import { SdButtonGoldenModule } from "../../../components/sd-button-golden/sd-button-golden.module";
import { PaymentCardItemModule } from "./payment-card-item/payment-card-item.module";
import { SdButtonClearModule } from "../../../components/sd-button-clear/sd-button-clear.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherCreditsBuyPageRoutingModule,
    SwiperModule,
    SdHeaderTopModule,
    SdButtonGoldenModule,
    PaymentCardItemModule,
    SdButtonClearModule
],
  declarations: [TeacherCreditsBuyPage]
})
export class TeacherCreditsBuyPageModule {}
