import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SdBbackBtnModule } from '../sd-bback-btn/sd-bback-btn.module';
import { SdBsearchBtnModule } from '../sd-bsearch-btn/sd-bsearch-btn.module';
import { SdBontiBtnModule } from '../sd-bonti-btn/sd-bonti-btn.module';
import { SdImageBoxComponent } from './sd-image-box.component';

@NgModule({
  declarations: [SdImageBoxComponent],
  imports: [
    CommonModule,
    IonicModule,
    SdBbackBtnModule,
    SdBsearchBtnModule,
    SdBontiBtnModule,
  ],
  exports: [SdImageBoxComponent],
})
export class SdImageBoxModule {}
