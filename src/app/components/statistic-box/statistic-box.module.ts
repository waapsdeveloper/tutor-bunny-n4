import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticBoxComponent } from './statistic-box.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [StatisticBoxComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    StatisticBoxComponent
  ]
})
export class StatisticBoxModule { }
