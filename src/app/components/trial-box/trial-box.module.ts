import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrialBoxComponent } from './trial-box.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [TrialBoxComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    TrialBoxComponent
  ]
})
export class TrialBoxModule { }
