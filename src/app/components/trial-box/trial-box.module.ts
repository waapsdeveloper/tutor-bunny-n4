import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrialBoxComponent } from './trial-box.component';
import { IonicModule } from '@ionic/angular';
import { NamesPipe } from 'src/app/pipes/names.pipe';
import { TrailListModule } from './trail-list/trail-list.module';



@NgModule({
  declarations: [TrialBoxComponent],
  imports: [
    CommonModule,
    IonicModule,
    TrailListModule
  ],
  exports: [
    TrialBoxComponent
  ]
})
export class TrialBoxModule { }
