import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SdButtonGrayModule } from '../../sd-button-gray/sd-button-gray.module';
import { SdHeaderTopModule } from '../../sd-header-top/sd-header-top.module';
import { MaterialLanguageListComponent } from './material-language-list.component';


@NgModule({
  declarations: [MaterialLanguageListComponent],
  imports: [
    CommonModule, IonicModule, FormsModule, SdHeaderTopModule, SdButtonGrayModule
  ]
  ,
  exports: [MaterialLanguageListComponent]
})
export class MaterialLanguageListModule { }
