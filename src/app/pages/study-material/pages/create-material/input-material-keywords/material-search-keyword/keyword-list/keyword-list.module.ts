import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeywordListComponent } from './keyword-list.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';



@NgModule({
  declarations: [KeywordListComponent],
  imports: [
    CommonModule,IonicModule, FormsModule, SdHeaderTopModule, SdButtonGrayModule
  ],
  exports:[KeywordListComponent]
})
export class KeywordListModule { }
