import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrailCardComponent } from './trail-card.component';
import { IonicModule } from '@ionic/angular';
import { NamesPipeModule } from 'src/app/pipes/name.pipe.module';



@NgModule({
  declarations: [TrailCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    NamesPipeModule
  ],
  exports: [TrailCardComponent]
})
export class TrailCardModule { }
