import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMaterialDocsPageRoutingModule } from './create-material-docs-routing.module';

import { CreateMaterialDocsPage } from './create-material-docs.page';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMaterialDocsPageRoutingModule,
    SdButtonClearModule,
    SdButtonGrayModule,
    SdHeaderTopModule,
  ],
  declarations: [CreateMaterialDocsPage],
})
export class CreateMaterialDocsPageModule {}
