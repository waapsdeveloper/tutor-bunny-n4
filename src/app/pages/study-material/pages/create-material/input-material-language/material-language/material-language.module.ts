import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialLanguageComponent } from './material-language.component';
import { MaterialLanguageListModule } from './material-language-list/material-language-list.module';
import { SdErrorInputInfoModule } from 'src/app/components/sd-error-input-info/sd-error-input-info.module';


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
