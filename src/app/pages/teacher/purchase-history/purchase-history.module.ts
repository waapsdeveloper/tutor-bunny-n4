import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseHistoryPageRoutingModule } from './purchase-history-routing.module';

import { PurchaseHistoryPage } from './purchase-history.page';
import { SdHeaderTopModule } from "../../../components/sd-header-top/sd-header-top.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseHistoryPageRoutingModule,
    SdHeaderTopModule
],
  declarations: [PurchaseHistoryPage]
})
export class PurchaseHistoryPageModule {}
