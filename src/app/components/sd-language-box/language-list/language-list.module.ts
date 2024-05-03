import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LanguageListComponent } from './language-list.component';
import { FormsModule } from '@angular/forms';
import { SdHeaderTopModule } from '../../sd-header-top/sd-header-top.module';
import { SdButtonGrayModule } from '../../sd-button-gray/sd-button-gray.module';

@NgModule({
  declarations: [LanguageListComponent],
  imports: [CommonModule, IonicModule, FormsModule, SdHeaderTopModule, SdButtonGrayModule],
  exports: [LanguageListComponent],
})
export class LanguagListeModule {}
