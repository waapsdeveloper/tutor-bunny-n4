import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrialBoxComponent } from './trial-box.component';
import { IonicModule } from '@ionic/angular';
import { NamesPipe } from 'src/app/names.pipe';



@NgModule({
  declarations: [TrialBoxComponent, NamesPipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    TrialBoxComponent
  ]
})
export class TrialBoxModule { }
