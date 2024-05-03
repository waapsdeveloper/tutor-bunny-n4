import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticBoxComponent } from './statistic-box.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [StatisticBoxComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    StatisticBoxComponent
  ]
})
export class StatisticBoxModule { }
