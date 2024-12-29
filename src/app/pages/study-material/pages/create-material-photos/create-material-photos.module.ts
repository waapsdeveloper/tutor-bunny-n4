import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMaterialPhotosPageRoutingModule } from './create-material-photos-routing.module';

import { CreateMaterialPhotosPage } from './create-material-photos.page';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMaterialPhotosPageRoutingModule,
    SdButtonClearModule,
    SdButtonGrayModule,
    SdHeaderTopModule
  ],
  declarations: [CreateMaterialPhotosPage]
})
export class CreateMaterialPhotosPageModule {}
