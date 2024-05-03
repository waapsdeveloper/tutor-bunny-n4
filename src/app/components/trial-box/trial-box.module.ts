import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrialBoxComponent } from './trial-box.component';



@NgModule({
  declarations: [TrialBoxComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TrialBoxComponent
  ]
})
export class TrialBoxModule { }
