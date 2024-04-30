import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdButtonGrayComponent } from './sd-button-gray.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SdButtonGrayComponent],
  imports: [CommonModule, IonicModule],
  exports: [SdButtonGrayComponent],
})
export class SdButtonGrayModule {}
