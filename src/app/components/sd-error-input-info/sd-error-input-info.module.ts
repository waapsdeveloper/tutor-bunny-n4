import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdErrorInputInfoComponent } from './sd-error-input-info.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [SdErrorInputInfoComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SdErrorInputInfoComponent
  ]
})
export class SdErrorInputInfoModule { }
