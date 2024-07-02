import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdAgeBooxComponent } from './sd-age-boox.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AgeListModule } from './age-list/age-list.module';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';



@NgModule({
  declarations: [SdAgeBooxComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    AgeListModule,
    SdErrorInputInfoModule
  ],
  exports:[SdAgeBooxComponent]
})
export class SdAgeBooxModule { }
