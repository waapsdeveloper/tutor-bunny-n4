import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectYearComponent } from './select-year.component';
import { IonicModule } from '@ionic/angular';
import { SdHeaderTopModule } from '../../sd-header-top/sd-header-top.module';
import { SdButtonGrayModule } from '../../sd-button-gray/sd-button-gray.module';



@NgModule({
  declarations: [SelectYearComponent],
  imports: [CommonModule, IonicModule, SdHeaderTopModule, SdButtonGrayModule],
  exports: [
    SelectYearComponent
  ]
})
export class SelectYearModule { }
