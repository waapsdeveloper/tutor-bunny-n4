import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdBsearchBtnComponent } from './sd-bsearch-btn.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SdBsearchBtnComponent],
  imports: [CommonModule, IonicModule],
  exports: [SdBsearchBtnComponent],
})
export class SdBsearchBtnModule {}
