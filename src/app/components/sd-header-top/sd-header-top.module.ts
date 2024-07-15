import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdHeaderTopComponent } from './sd-header-top.component';
import { IonicModule } from '@ionic/angular';
import { SdBbackBtnModule } from '../sd-bback-btn/sd-bback-btn.module';
import { SdBsearchBtnModule } from '../sd-bsearch-btn/sd-bsearch-btn.module';
import { SdBontiBtnModule } from '../sd-bonti-btn/sd-bonti-btn.module';
import { SdEditButtonModule } from "../sd-edit-button/sd-edit-button.module";
import { SdShareButtonModule } from '../sd-share-button/sd-share-button.module';

@NgModule({
  declarations: [SdHeaderTopComponent],
  imports: [
    CommonModule,
    IonicModule,
    SdBbackBtnModule,
    SdBsearchBtnModule,
    SdBontiBtnModule,
    SdEditButtonModule,
    SdShareButtonModule
],
  exports: [SdHeaderTopComponent],
})
export class SdHeaderTopModule {}
