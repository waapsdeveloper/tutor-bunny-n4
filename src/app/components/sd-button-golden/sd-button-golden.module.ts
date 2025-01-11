import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdButtonGoldenComponent } from './sd-button-golden.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [SdButtonGoldenComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SdButtonGoldenComponent
  ]
})
export class SdButtonGoldenModule { }
