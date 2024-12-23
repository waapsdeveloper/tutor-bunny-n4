import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SdBbackBtnModule } from '../../components/sd-bback-btn/sd-bback-btn.module';
import { ForgetPasswordModule } from '../forget-password/forget-password.module';
import { LoginPageModule } from '../login/login.module';
import { SignUpPageModule } from '../sign-up/sign-up.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SdBbackBtnModule,
    ForgetPasswordModule,
    LoginPageModule,
    SignUpPageModule

  ],
  declarations: [HomePage],
})
export class HomePageModule {}
