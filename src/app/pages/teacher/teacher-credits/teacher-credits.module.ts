import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherCreditsPageRoutingModule } from './teacher-credits-routing.module';

import { TeacherCreditsPage } from './teacher-credits.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { SdButtonGoldenModule } from "../../../components/sd-button-golden/sd-button-golden.module";
import { SdButtonClearModule } from "../../../components/sd-button-clear/sd-button-clear.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherCreditsPageRoutingModule,
    SdHeaderTopModule,
    SdButtonGoldenModule,
    SdButtonClearModule
],
  declarations: [TeacherCreditsPage]
})
export class TeacherCreditsPageModule {}
