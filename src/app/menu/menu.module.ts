import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { MenuImageBoxModule } from './menu-image-box/menu-image-box.module';
import { MenuListBoxModule } from './menu-list-box/menu-list-box.module';
import { MenuFooterBoxModule } from './menu-footer-box/menu-footer-box.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    SdHeaderTopModule,
    MenuImageBoxModule,
    MenuListBoxModule,
    MenuFooterBoxModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
