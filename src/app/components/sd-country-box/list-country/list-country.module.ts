import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCountryComponent } from './list-country.component';
import { IonicModule } from '@ionic/angular';
import { SdButtonGrayModule } from '../../sd-button-gray/sd-button-gray.module';
import { SdHeaderTopModule } from '../../sd-header-top/sd-header-top.module';

@NgModule({
  declarations: [ListCountryComponent],
  imports: [CommonModule, IonicModule, SdHeaderTopModule, SdButtonGrayModule],
  exports: [ListCountryComponent],
})
export class ListCountryModule {}
