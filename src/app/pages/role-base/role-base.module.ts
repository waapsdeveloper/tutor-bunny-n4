import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoleBasePageRoutingModule } from './role-base-routing.module';

import { RoleBasePage } from './role-base.page';
import { SdButtonClearModule } from '../../components/sd-button-clear/sd-button-clear.module';
import { SdButtonGrayModule } from '../../components/sd-button-gray/sd-button-gray.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoleBasePageRoutingModule,
    SdButtonClearModule,
    SdButtonGrayModule,
  ],
  declarations: [RoleBasePage],
})
export class RoleBasePageModule {}
