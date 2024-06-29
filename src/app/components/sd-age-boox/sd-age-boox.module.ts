import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdAgeBooxComponent } from './sd-age-boox.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AgeListModule } from './age-list/age-list.module';



@NgModule({
  declarations: [SdAgeBooxComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    AgeListModule
  ],
  exports:[SdAgeBooxComponent]
})
export class SdAgeBooxModule { }
