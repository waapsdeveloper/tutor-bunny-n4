import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMaterialPageRoutingModule } from './create-material-routing.module';

import { CreateMaterialPage } from './create-material.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { SdInputBoxModule } from 'src/app/components/sd-input-box/sd-input-box.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMaterialPageRoutingModule,
    SdHeaderTopModule,
    SdButtonGrayModule,
    SdButtonClearModule,
    SdInputBoxModule,

  ],
  declarations: [CreateMaterialPage]
})
export class CreateMaterialPageModule {}
