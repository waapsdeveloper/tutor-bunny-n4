import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdLanguageBoxComponent } from './sd-language-box.component';
import { LanguagListeModule } from './language-list/language-list.module';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';

@NgModule({
  declarations: [SdLanguageBoxComponent],
  imports: [CommonModule, FormsModule, IonicModule,LanguagListeModule, SdErrorInputInfoModule],
  exports: [SdLanguageBoxComponent],
})
export class SdLanguageBoxModule {}
