import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrailCardComponent } from './trail-card.component';



@NgModule({
  declarations: [TrailCardComponent],
  imports: [
    CommonModule
  ],
  exports:[TrailCardComponent]
})
export class TrailCardModule { }
