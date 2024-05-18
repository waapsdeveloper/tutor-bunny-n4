import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SdBbackBtnModule } from '../sd-bback-btn/sd-bback-btn.module';
import { SdBsearchBtnModule } from '../sd-bsearch-btn/sd-bsearch-btn.module';
import { SdBontiBtnModule } from '../sd-bonti-btn/sd-bonti-btn.module';
import { SdImageBoxComponent } from './sd-image-box.component';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';

@NgModule({
  declarations: [SdImageBoxComponent],
  imports: [
    CommonModule,
    IonicModule,
    SdBbackBtnModule,
    SdBsearchBtnModule,
    SdBontiBtnModule,
    SdErrorInputInfoModule
  ],
  exports: [SdImageBoxComponent],
})
export class SdImageBoxModule {}
