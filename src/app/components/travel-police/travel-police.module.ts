import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelPoliceComponent } from './travel-police.component';
import { IonicModule } from '@ionic/angular';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';
import { FormsModule } from '@angular/forms';
import { PolicyListModule } from './policy-list/policy-list.module';



@NgModule({
  declarations: [TravelPoliceComponent],
  imports: [
    CommonModule,
    IonicModule,
    SdErrorInputInfoModule,
    FormsModule,
    PolicyListModule
  ],
  exports: [TravelPoliceComponent]
})
export class TravelPoliceModule { }
