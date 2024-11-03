import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SdBbackBtnModule } from '../../components/sd-bback-btn/sd-bback-btn.module';
import { ForgetPasswordModule } from '../login/forget-password/forget-password.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SdBbackBtnModule,
    ForgetPasswordModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
