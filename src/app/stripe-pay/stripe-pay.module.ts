import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StripePayComponent } from './stripe-pay.component';
import { SdInputBoxModule } from '../components/sd-input-box/sd-input-box.module';
import { SdButtonGoldenModule } from '../components/sd-button-golden/sd-button-golden.module';
import { SdButtonClearModule } from '../components/sd-button-clear/sd-button-clear.module';



@NgModule({
  declarations: [StripePayComponent],
  imports: [
    CommonModule,
    IonicModule,
    SdInputBoxModule,
    SdButtonGoldenModule,
    SdButtonClearModule
  ]
})
export class StripePayModule { }
