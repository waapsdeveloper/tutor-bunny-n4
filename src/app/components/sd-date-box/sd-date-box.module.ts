import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdDateBoxComponent } from './sd-date-box.component';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [SdDateBoxComponent],
  imports: [
    CommonModule,
    IonicModule,
    SdErrorInputInfoModule,
    FormsModule
  ],
  exports: [SdDateBoxComponent]
})
export class SdDateBoxModule { }
