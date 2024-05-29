import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDatesPageRoutingModule } from './add-dates-routing.module';

import { AddDatesPage } from './add-dates.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { SdButtonGrayModule } from '../components/sd-button-gray/sd-button-gray.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDatesPageRoutingModule,
    SdHeaderTopModule,
    SdButtonGrayModule
  ],
  declarations: [AddDatesPage]
})
export class AddDatesPageModule {}
