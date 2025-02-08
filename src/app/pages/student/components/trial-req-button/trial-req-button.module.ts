import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrialReqButtonComponent } from './trial-req-button.component';
import { IonicModule } from '@ionic/angular';
import { SdButtonGoldenModule } from "../../../../components/sd-button-golden/sd-button-golden.module";



@NgModule({
  declarations: [TrialReqButtonComponent],
  imports: [
    CommonModule,
    IonicModule,
    SdButtonGoldenModule
],
  exports: [TrialReqButtonComponent]
})
export class TrialReqButtonModule { }
