import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddScheduleComponent } from './add-schedule.component';
import { IonicModule } from '@ionic/angular';
import { SdButtonGrayModule } from '../../sd-button-gray/sd-button-gray.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddScheduleComponent],
  imports: [
    CommonModule,
    IonicModule,
    SdButtonGrayModule,
    FormsModule
  ],
  exports: [AddScheduleComponent]
})
export class AddScheduleModule { }
