import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialLanguageListComponent } from './material-language-list.component';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';


@NgModule({
  declarations: [MaterialLanguageListComponent],
  imports: [
    CommonModule, IonicModule, FormsModule, SdHeaderTopModule, SdButtonGrayModule
  ]
  ,
  exports: [MaterialLanguageListComponent]
})
export class MaterialLanguageListModule { }
