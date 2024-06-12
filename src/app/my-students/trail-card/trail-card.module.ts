import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrailCardComponent } from './trail-card.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [TrailCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [TrailCardComponent]
})
export class TrailCardModule { }
