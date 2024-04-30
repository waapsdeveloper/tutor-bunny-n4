import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SdBbackBtnModule } from '../components/sd-bback-btn/sd-bback-btn.module';
import { FakeAccountsModule } from './fake-accounts/fake-accounts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SdBbackBtnModule,
    FakeAccountsModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
