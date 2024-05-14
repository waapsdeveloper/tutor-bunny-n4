import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdDailcodeBoxComponent } from './sd-dailcode-box.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';



@NgModule({
  declarations: [SdDailcodeBoxComponent],
  imports: [
    CommonModule,IonicModule, FormsModule, SdErrorInputInfoModule
  ],
  exports:[SdDailcodeBoxComponent]
})
export class SdDailcodeBoxModule { }
