import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListCountryModule } from '../sd-country-box/list-country/list-country.module';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';
import { MaterialLanguageComponent } from './material-language.component';
import { MaterialLanguageListModule } from './material-language-list/material-language-list.module';


@NgModule({
  declarations: [MaterialLanguageComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SdErrorInputInfoModule,
    MaterialLanguageListModule

  ],
  exports:[MaterialLanguageComponent]
})
export class MaterialLanguageModule { }
