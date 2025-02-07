import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrialReqButtonComponent } from './trial-req-button.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [TrialReqButtonComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [TrialReqButtonComponent]
})
export class TrialReqButtonModule { }
