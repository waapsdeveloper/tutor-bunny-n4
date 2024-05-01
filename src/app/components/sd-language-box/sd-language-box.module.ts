import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdLanguageBoxComponent } from './sd-language-box.component';
import { LanguagListeModule } from './language-list/language-list.module';

@NgModule({
  declarations: [SdLanguageBoxComponent],
  imports: [CommonModule, FormsModule, IonicModule,LanguagListeModule],
  exports: [SdLanguageBoxComponent],
})
export class SdLanguageBoxModule {}
