import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdCountryBoxComponent } from './sd-country-box.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ListCountryModule } from './list-country/list-country.module';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';

@NgModule({
  declarations: [SdCountryBoxComponent],
  imports: [CommonModule, IonicModule, FormsModule, ListCountryModule, SdErrorInputInfoModule],
  exports: [SdCountryBoxComponent],
})
export class SdCountryBoxModule {}
